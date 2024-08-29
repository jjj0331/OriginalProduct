class UserStatusesController < ApplicationController
  include AuthHelper

  def create_user_status
    user = current_user
    return render json: { error: 'ユーザーが認証されていません' }, status: :unauthorized if user.nil?
  
    guideline = Guideline.includes(tasks: :detail_tasks).find_by(id: params[:id])
    return render json: { error: 'ガイドラインが見つかりません' }, status: :not_found if guideline.nil?
  
    begin
      ActiveRecord::Base.transaction do
        guideline.tasks.each do |task|
          # detail_tasksが存在しない場合はnilを含めて一つの配列にする
          (task.detail_tasks.presence || [nil]).each do |detail_task|
            user_status = UserStatus.new(
              user_id: user.id,
              guideline_id: guideline.id,
              task_id: task.id,
              detail_task_id: detail_task&.id,
              status: false # 初期ステータス
            )
  
            unless user_status.save
              Rails.logger.error(user_status.errors.full_messages.join(", "))
              render json: { error: user_status.errors.full_messages }, status: :unprocessable_entity
              raise ActiveRecord::Rollback
            end
          end
        end
      end
  
      render json: { message: '登録しました' }, status: :created
    rescue ActiveRecord::RecordNotUnique => e
      # 一意制約エラーが発生した場合
      render json: { error: 'すでに登録されています' }, status: :unprocessable_entity
    rescue StandardError => e
      Rails.logger.error("Transaction failed: #{e.message}")
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
  

  def show_user_status
    current_user
    data = UserStatus.includes(:guideline).where(user_id: @current_user.id).map(&:guideline).uniq
    
    if data.blank? || @current_user.nil?
      render json: { error: 'ユーザーまたはガイドラインが見つかりません' }, status: :unprocessable_entity
    else
      render json: data, status: :ok
    end
  end
  
  

end
