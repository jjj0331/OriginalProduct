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
            # 既存のUserStatusを確認し、削除
            existing_status = UserStatus.find_by(
              user_id: user.id,
              guideline_id: guideline.id,
              task_id: task.id,
              detail_task_id: detail_task&.id
            )
            existing_status&.destroy # 既存のステータスを削除
  
            # 新しいUserStatusを作成
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
  
      render json: { message: '登録を更新しました' }, status: :created
    rescue ActiveRecord::RecordNotUnique => e
      # 一意制約エラーが発生した場合
      render json: { error: 'すでに登録されています' }, status: :unprocessable_entity
    rescue StandardError => e
      Rails.logger.error("Transaction failed: #{e.message}")
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
  
  

  def show_user_one_status
    current_user
    guideline_id = params[:id]
    
    # 指定されたガイドラインとユーザーに関連する UserStatus を取得
    user_statuses = UserStatus.includes(:guideline)
                              .where(user_id: @current_user.id, guideline_id: guideline_id)
  
    guideline = user_statuses.first&.guideline
  
    return render json: { error: 'No data found' }, status: :not_found if guideline.nil?
  
    result = {
      guideline_id: guideline.id,
      guideline_title: guideline.title,
      guideline_description: guideline.description,
      tasks: guideline.tasks.map do |task|
        {
          task_id: task.id,
          task_title: task.title,
          task_description: task.description,
          detail_tasks: task.detail_tasks.map do |detail_task|
            user_status = user_statuses.find { |us| us.detail_task_id == detail_task.id }
            {
              detail_task_id: detail_task.id,
              detail_task_title: detail_task.title,
              detail_task_description: detail_task.description,
              status: user_status&.status # 該当する detail_task_id のステータスを取得
            }
          end
        }
      end
    }
  
    render json: result
  rescue NoMethodError => e
    render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
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
  


  def update_user_status
    current_user

    if @current_user.nil?
      render json: { error: 'ユーザーが見つかりません' }, status: :unauthorized
      return
    end

    detailTaskId = params[:id]
    user_status = UserStatus.find_by(user_id: @current_user.id, detail_task_id: detailTaskId)

    if user_status.nil?
      render json: { error: '該当するタスクステータスが見つかりません' }, status: :not_found
    else
      # ステータスを true に更新
      user_status.update(status: true)
      render json: { message: 'タスクステータスが更新されました' }, status: :ok
    end
  end

#=======================================================================================  
#【個人設定】
  #個人設定を取得する
  def get_personal_settings
    if current_user.nil?
      render json: { error: 'ユーザーが見つかりません' }, status: :unprocessable_entity
    else
      render json: current_user.personal_settings, status: :ok
    end
  end

  # 個人設定を更新する
  def update_personal_settings
    # current_userを使って、認証されたユーザーの情報を取得
    if current_user.update_attribute(:personal_settings, personal_settings_params[:goal])
      render json: { message: '個人設定が更新されました' }, status: :ok
    else
      # エラーメッセージをログ出力して、失敗理由を特定
      Rails.logger.error("バリデーションエラー: #{current_user.errors.full_messages}")
      render json: { error: '個人設定の更新に失敗しました', details: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # パラメータ制御
  private

  def personal_settings_params
    params.require(:personal_settings).permit(:goal)
  end

end
