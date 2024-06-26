class User < ApplicationRecord
  has_many :guidelines
  #bcryptを使用するため、Userにpassword項目を追記
  has_secure_password

end
