class AddPersonalSettingsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :personal_settings, :json
  end
end
