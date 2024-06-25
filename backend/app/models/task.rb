class Task < ApplicationRecord
  belongs_to :guideline

  has_many :detail_tasks, dependent: :destroy

  accepts_nested_attributes_for :detail_tasks, allow_destroy: true
  
  validates :title, presence: true
end
