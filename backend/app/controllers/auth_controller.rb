class AuthController < ApplicationController
  #auth_helper.rbのAuthHelperモジュールをインポート
  include AuthHelper

  #登録
  def create
    @user = User.new(user_params)

    if @user.save
      access_token = JsonWebToken.create_token(@user.id)
      refresh_token = JsonWebToken.create_token(@user.id, 7.days.from_now)
      render json: { access_token: access_token, refresh_token: refresh_token }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # ログイン
  def login
    user = User.find_by(username: params[:user][:username])
    
    if user && user.authenticate(params[:user][:password])
      access_token = JsonWebToken.create_token(user.id)
      refresh_token = JsonWebToken.create_token(user.id, 7.days.from_now)
      render json: { access_token: access_token, refresh_token: refresh_token }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  #ユーザの参照
  def showloginuser
    current_user
    if @current_user
      render json:{user_id:@current_user.id}
    else
      render json:{message:'そんなユーザは存在しない'}
    end    
  end  

  def show
    begin
      @user = User.find(params[:id])
      
      if @user
        render json: { message: 'ユーザが見つかりました' ,user: @user}, status: :ok
      else
        render json: { message: 'ユーザが見つかりませんでした' }, status: :not_found
      end

    rescue ActiveRecord::RecordNotFound => e
      render json: { message: 'ユーザが見つかりませんでした', error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: 'エラーが発生しました', error: e.message }, status: :internal_server_error  
    end
  end

  private
  #パラメータ制御
  def user_params
    params.require(:user).permit(:username,  :password, :password_confirmation)
  end
end
