class CreateThesisProjects < ActiveRecord::Migration[5.2]
	def change
		create_table :thesis_projects do |t|
			t.string :title, null: false
			t.string :document, null: false
			t.boolean :approbation_state, null: false
			t.boolean :activation_state, null: false
			t.timestamps
		end
	end
end
