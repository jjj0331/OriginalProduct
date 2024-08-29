class AddUniqueIndexToUserStatuses < ActiveRecord::Migration[7.1]
  def change
    add_index :user_statuses, [:user_id, :guideline_id, :task_id, :detail_task_id], unique: true, name: 'index_user_statuses'
    
  end
end
