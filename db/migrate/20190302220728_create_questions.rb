class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.text :question
      t.references :user, foreign_key: true #Who asked the question
      t.references :thesis_project, foreign_key: true 
    end
  end
end
