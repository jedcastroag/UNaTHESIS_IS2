class CreateThesisProjects < ActiveRecord::Migration[5.2]
	def change
		create_table :thesis_projects do |t|
			t.string :title, null: false
			t.string :document, null: true
			t.text :description, null: true
			t.boolean :approbation_state, null: true
			t.boolean :activation_state, null: true
			t.timestamps
		end
	end
end
