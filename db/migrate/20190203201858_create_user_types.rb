class CreateUserTypes < ActiveRecord::Migration[5.2]
    def change
        create_table :user_types, id: false, primary_key: :role do |t|
            t.string :role, null:false
            t.string :user_role_name, null: false
            t.timestamps
        end
        add_index :user_types, :role, unique: true
    end
end
