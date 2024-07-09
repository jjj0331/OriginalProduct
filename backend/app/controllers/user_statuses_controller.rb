class UserStatusesController < ApplicationController
  include AuthHelper

  def create_user_status
    current_user
    user = User.find(current_user.id)
    guideline = Guideline.includes(tasks: :detail_tasks).find_by(id: params[:id])

    if guideline.nil?
      render json: { error: 'ガイドラインが見つかりません' }, status: :not_found
      return
    end

    begin
      ActiveRecord::Base.transaction do
        guideline.tasks.each do |task|
          task.detail_tasks.each do |detail_task|
            user_status = UserStatus.new(
              user: user,
              guideline: guideline,
              task: task,
              detail_task: detail_task,
              status: false # 初期ステータス
            )
            unless user_status.save
              Rails.logger.error(user_status.errors.full_messages)
              render json: { error: user_status.errors.full_messages }, status: :unprocessable_entity
              raise ActiveRecord::Rollback
            end
          end
        end
      end

      render json: { message: '登録しました' }, status: :created
    rescue StandardError => e
      Rails.logger.error(e.message)
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def show_user_status
    current_user
    data = UserStatus.includes(:guideline).where(user_id: @current_user.id).map(&:guideline).uniq


    if data.blank? || @current_user.nil?
      render json: { error: 'ユーザーまたはガイドラインが見つかりません' }, status: :unprocessable_entity
    else
      render json: { data: data }, status: :ok
    end
  end  

end
