class DetailTask < ApplicationRecord
  belongs_to :task
  validates :title, presence: true
  has_many :user_statuses, dependent: :destroy
end
