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

	def comments
		Comment.select('users."name", users.surname, users.email, 
			thesis_project_users.thesis_project_roles_id as role, "comments".*')
			.joins('inner join thesis_project_users on thesis_project_users.user_id = "comments".users_id ')
			.joins('inner join users on users.id = "comments".users_id')
			.where('"comments".thesis_project_id = ?', self.id)
	end
end
