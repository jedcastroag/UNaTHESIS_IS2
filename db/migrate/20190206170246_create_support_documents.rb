class CreateSupportDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :support_documents do |t|
      t.string :document, null: false
      t.references :thesis_project_log
      t.timestamps
    end
  end
end
