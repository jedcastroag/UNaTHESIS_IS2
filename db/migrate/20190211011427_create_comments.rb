class CreateComments < ActiveRecord::Migration[5.2]
    def change
        create_table :comments do |t|
            t.references :thesis_project_user, index: true, foreign_key: { to_table: :thesis_projects_users }
            t.string :content, null: false
            t.timestamps
        end
    end
end
