class CreateThesisProjectsUsers < ActiveRecord::Migration[5.2]
	def change
		create_join_table :thesis_projects, :users do |t|
			t.primary_key :id
			t.index [:thesis_project_id, :user_id], :unique => true
			t.index [:user_id, :thesis_project_id], :unique => true
			t.references :thesis_project_rol, foreign_key: true
		end
	end
end
