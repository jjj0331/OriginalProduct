class Guideline < ApplicationRecord
  belongs_to :user

  has_many :user_statuses, dependent: :destroy
  has_many :tasks, dependent: :destroy
  
  accepts_nested_attributes_for :tasks, allow_destroy: true
  
  validates :title, presence: true
end
