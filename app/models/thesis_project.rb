class ThesisProject < ApplicationRecord
	has_many :thesis_project_users
	has_many :users, through: :thesis_project_users
	has_many :comments
end
