class ThesisProject < ApplicationRecord
	has_many :thesis_project_users
	has_many :users, through: :thesis_project_users
	has_many :comments

	def related_users(user)
		ThesisProject.select('users.name, users.surname, users.email,
			thesis_project_users.thesis_project_roles_id as role, users.institution, 
			users.country, thesis_project_users.confirmed, thesis_project_users.user_id')
			.joins('INNER JOIN thesis_project_users ON thesis_projects.id = thesis_project_users.thesis_project_id')
			.joins('INNER JOIN users ON thesis_project_users.user_id = users.id')
			.where('thesis_projects.id = ? AND NOT users.id = ?', self.id, user.id)
	end
end
