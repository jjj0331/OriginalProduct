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
    @alldata=Guideline.includes(tasks: :detail_tasks).limit(20)
    render json:@alldata,status: :ok
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
