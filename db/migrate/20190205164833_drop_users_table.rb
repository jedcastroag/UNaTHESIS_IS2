class DropUsersTable < ActiveRecord::Migration[5.2]
  def up
  	drop_table :users, if_exists:true
  end
  def down
  	raise ActiveRecord::IrreversibleMigration
  end
end
