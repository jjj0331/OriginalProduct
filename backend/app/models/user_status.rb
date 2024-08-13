class UserStatus < ApplicationRecord
  belongs_to :user
  belongs_to :guideline
  belongs_to :task
  belongs_to :detail_task, optional: true
end
