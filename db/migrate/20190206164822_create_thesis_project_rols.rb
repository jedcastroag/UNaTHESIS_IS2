class CreateThesisProjectRols < ActiveRecord::Migration[5.2]
  def change
    create_table :thesis_project_rols do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
