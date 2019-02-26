class CreateJoinTableThesisProjectUser < ActiveRecord::Migration[5.2]
  def change
    create_join_table :thesis_projects, :users do |t|
      t.primary_key :id
      t.index [:thesis_project_id, :user_id]
      t.index [:user_id, :thesis_project_id]
      t.references :thesis_project_rol, foreign_key: true
    end
  end
end
