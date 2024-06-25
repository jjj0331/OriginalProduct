module AuthHelper
  require 'jwt'

  class JsonWebToken
    #JWTを発行するKEY
    SECRET_KEY = Rails.application.credentials.secret_key_base
    
    #【tokenの作成】
    def self.create_token(user_id,exp = 24.hours.from_now)
      payload = { user_id: user_id ,exp: exp.to_i}
      token = JWT.encode(payload, SECRET_KEY)
      return token
    end
    
    #【tokenの作成】
    def self.decode(token)
      begin
        body = JWT.decode(token, SECRET_KEY)[0]
        HashWithIndifferentAccess.new(body)
      rescue JWT::ExpiredSignature
        nil  # トークンが期限切れの場合はnilを返す
      rescue JWT::DecodeError => e
        Rails.logger.error("JWT Decode Error: #{e.message}")
        nil
      end
    end

    #【ログインユーザ】
    def current_user
      # Authorizationヘッダーからトークンを取得
      token = request.headers["Authorization"]&.split(" ")&.last
      
      if token
        # トークンをデコードしてユーザーIDを取得
        decoded_token = JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')
        user_id = decoded_token.first["user_id"]
        
        # データベースからユーザーを取得
        @current_user ||= User.find_by(id: user_id)
      end
    end
  end
end  