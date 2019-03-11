class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :thesis_project, index: true, foreign_key: true, null: false
      t.references :users, index: true, foreign_key: true, null: false
      t.string :title, null: false
      t.string :content, null: false
      t.timestamps
    end
  end
end
