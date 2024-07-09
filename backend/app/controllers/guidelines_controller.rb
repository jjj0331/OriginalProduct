class GuidelinesController < ApplicationController
  #auth_helper.rbのAuthHelperモジュールをインポート
  include AuthHelper

  #ガイドラインの作成
  def create
    #helperのメソッドを実行
    current_user
    if @current_user
      @guideline = Guideline.new(guideline_params)
      @guideline.user_id=@current_user.id
      if @guideline.save
        render json: @guideline, status: :created
      else
        render json: { message: '保存に失敗しました', errors: @guideline.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json:{message: 'ログインしてください'}
    end    
  end
  
  #ガイドラインの参照
  def showall
    @alldata=Guideline.limit(20)
    render json:@alldata,status: :ok
  end

  def show
    begin
      @data = Guideline.includes(tasks: :detail_tasks).find(params[:id])
      render json: @data.as_json(include: { tasks: { include: :detail_tasks } }), status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { error: '探しているガイドラインは存在しない' }, status: :not_found
    end
  end

  def search
    if params[:query].present?
      @data = Guideline.includes(tasks: :detail_tasks).where('title LIKE ?', "%#{params[:query]}%")
    else
      @data = Guideline.limit(20)
    end

    render json: @data
  end

  def myguidelines
    current_user
    data=Guideline.includes(tasks: :detail_tasks).where(user_id: @current_user.id)

    if data
      render json: {data:data ,status: :ok}
    else
      render json: { error: '探しているガイドラインは存在しない' }, status: :not_found
    end    
  end  


#ガイドラインの更新
def update
  current_user # ヘルパーメソッドを実行
  if @current_user
    @guideline = Guideline.find_by(id: params[:id]) # 更新対象のガイドラインを取得
    if @guideline
      if @guideline.user_id == @current_user.id # 所有者を確認
        if @guideline.update(guideline_params)
          render json: @guideline, status: :ok # ステータスコードを適切に変更
        else
          render json: { message: '更新に失敗しました', errors: @guideline.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { message: '権限がありません' }, status: :forbidden
      end
    else
      render json: { message: 'ガイドラインが見つかりません' }, status: :not_found
    end
  else
    render json: { message: 'ログインしてください' }, status: :unauthorized
  end
end

#ガイドラインの削除
def destroy
  current_user # ヘルパーメソッドを実行
  if @current_user
    @guideline = Guideline.find_by(id: params[:id]) # 更新対象のガイドラインを取得
    if @guideline
      if @guideline.user_id == @current_user.id # 所有者を確認
        if @guideline.destroy
          render json: @guideline, status: :ok # ステータスコードを適切に変更
        else
          render json: { message: '削除に失敗しました', errors: @guideline.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { message: '権限がありません' }, status: :forbidden
      end
    else
      render json: { message: 'ガイドラインが見つかりません' }, status: :not_found
    end
  else
    render json: { message: 'ログインしてください' }, status: :unauthorized
  end
end


private

def guideline_params
  params.require(:guideline).permit(:title, :description, tasks_attributes: [:id, :title, :description, detail_tasks_attributes: [:id, :title, :description]])
end

  
  #パラメータ制御
  private
  def guideline_params
    params.require(:guideline).permit(:title, :description, tasks_attributes: [
      :id, :title, :description, :_destroy, detail_tasks_attributes: [
        :id, :title, :description, :_destroy
      ]
    ])
  end
end
