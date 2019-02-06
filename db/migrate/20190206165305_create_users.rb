class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.references :user_type, foreign_key: true
      t.string :name, null: false
      t.string :surname, null: false
      t.string :email, null:false
      t.timestamps
    end
  end
end
