class User < ApplicationRecord
  #Userモデルは複数の[guidelines][user_status]を所持、User削除時にそれらのレコードも消える
  has_many :guidelines, dependent: :destroy
  has_many :user_status, dependent: :destroy
  #bcryptを使用するため、Userにpassword項目を追記
  has_secure_password
end
