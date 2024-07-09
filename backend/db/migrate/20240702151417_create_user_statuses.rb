class CreateUserStatuses < ActiveRecord::Migration[7.1]
  def change
    create_table :user_statuses do |t|
      t.references :user, null: false, foreign_key: true
      t.references :guideline, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true
      t.references :detail_task, null: false, foreign_key: true
      t.boolean :status

      t.timestamps
    end
  end
end
