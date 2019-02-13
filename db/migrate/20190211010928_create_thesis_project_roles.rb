class CreateThesisProjectRoles < ActiveRecord::Migration[5.2]
    def change
        create_table :thesis_project_roles do |t|
            t.string :name, null: false
            t.timestamps
        end
    end
end
