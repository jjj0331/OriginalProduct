class Task < ApplicationRecord
  belongs_to :guideline

  has_many :detail_tasks, dependent: :destroy 
  has_many :user_statuses,dependent: :destroy
  
  #親モデルが子モデルの属性を受け入れる
  #わざわざ、子モデルの更新をloop処理で書かずに親も出ると一緒の扱い
  accepts_nested_attributes_for :detail_tasks, allow_destroy: true
  
  validates :title, presence: true
end
