class CreateThesisProjectUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :thesis_project_users do |t|
      t.references :thesis_project_rols, foreign_key: true, index: true
      t.belongs_to :thesis_project, null: false, index: true
      t.belongs_to :user, null: false, index: true
      t.timestamps

      t.index [:thesis_project_id, :user_id], :unique => true
      t.index [:user_id, :thesis_project_id], :unique => true
    end
  end
end
