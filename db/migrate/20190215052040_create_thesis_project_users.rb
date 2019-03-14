class CreateThesisProjectUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :thesis_project_users do |t|
      t.references :thesis_project_roles, foreign_key: true, index: true, null: false
      t.belongs_to :thesis_project, null: false, index: true, foreign_key: true
      t.belongs_to :user, null: false, index: true, foreign_key: true
      t.boolean :confirmed, null: false, default: true
      t.timestamps

      t.index [:thesis_project_id, :user_id], :unique => true
      t.index [:user_id, :thesis_project_id], :unique => true
    end
  end
end
