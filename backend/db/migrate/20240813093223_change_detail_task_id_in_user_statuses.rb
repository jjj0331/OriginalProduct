class ChangeDetailTaskIdInUserStatuses < ActiveRecord::Migration[7.1]
  def change
    change_column_null :user_statuses, :detail_task_id, true
  end
end
