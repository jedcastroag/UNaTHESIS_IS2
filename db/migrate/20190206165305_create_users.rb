class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.references :user_type, foreign_key: true
      
      t.string :name, null: false
      t.string :surname, null: false
      t.string :dni, null: false, unique:true
      t.string :email, null: false, unique:true
      t.string :institution, null:false, default: "universidad nacional de colombia"
      t.string :country, null: false, default: "colombia"
      t.boolean :activated, null: false, default: false
      t.string :password_digest, null:false
      t.string :reset_digest
      t.datetime :reset_sent_at

      t.index :email

      t.timestamps
    end
  end
end
