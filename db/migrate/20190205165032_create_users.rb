class CreateUsers < ActiveRecord::Migration[5.2]
	def change
		create_table :users do |t|
			t.integer :id_user_type
			t.string :name
			t.string :email

			t.timestamps
		end
	end
end
