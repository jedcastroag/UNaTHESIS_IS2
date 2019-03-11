class CreateThesis < ActiveRecord::Migration[5.2]
  def change
    create_table :thesis do |t|
      t.references :thesis_project_father, index: true, foreign_key: { to_table: :thesis_projects }
      t.references :thesis_project_associated, index: true, foreign_key: { to_table: :thesis_projects }
      t.timestamps
    end

  end
end
