class User < ApplicationRecord
  #Userモデルは複数の[guidelines][user_status]を所持、User削除時にそれらのレコードも消える
  has_many :guidelines, dependent: :destroy
  has_many :user_status, dependent: :destroy

  #bcryptを使用するため、Userにpassword項目を追記
  has_secure_password

  #各項目のバリデーション
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? } # パスワードが空でない場合のみバリデーション
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true, allow_nil: true # allow_nilを追加

  #emailを保存する前に小文字にしてから保存
  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase if email.present? # emailが存在する場合にのみ小文字に変換
  end
end
