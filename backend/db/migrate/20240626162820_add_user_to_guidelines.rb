class AddUserToGuidelines < ActiveRecord::Migration[7.1]
  def change
    add_reference :guidelines, :user, null: false, foreign_key: true
  end
end
