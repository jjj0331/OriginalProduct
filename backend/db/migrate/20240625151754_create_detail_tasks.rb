class CreateDetailTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :detail_tasks do |t|
      t.string :title
      t.text :description
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
