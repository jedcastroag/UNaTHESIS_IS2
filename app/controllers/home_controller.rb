class HomeController < ApplicationController
	def initialize
		super User.user_type_ids
	end

	def view
		body = {
			:user_type_id => @current_user.user_type_id
		}

		case @current_user.user_type_id
		when 'admin'
			
		when 'student'
			thesis_project = @current_user.thesis_projects.last

			users = ThesisProject.select('users.name, users.surname, users.email,
				thesis_project_users.thesis_project_roles_id as role, users.institution, 
				users.country, thesis_project_users.confirmed, thesis_project_users.user_id')
				.joins('INNER JOIN thesis_project_users ON thesis_projects.id = thesis_project_users.thesis_project_id')
				.joins('INNER JOIN users ON thesis_project_users.user_id = users.id')
				.where('thesis_projects.id = ? AND NOT users.id = ?', thesis_project.id, @current_user.id) if thesis_project

			student = { 
				:thesis => thesis_project, 
				:comments => thesis_project&.comments || [],
				:users => users || []
			}
			body.merge! student
		when 'jury_tutor'
			jury_tutor = {
				:is_jury => (is_rol? :jury),
				:is_tutor => (is_rol? :tutor),
				:name => @current_user.name,
				:surname => @current_user.surname,
				:email => @current_user.email
			}
			body.merge! jury_tutor
		else
			raise "Invalid request #{@current_user.user_type_id}"
		end

		render json: body
	rescue => error
		render json: { error: error }, status: :unauthorized
	end

	private

	def is_rol? (rol_id)
		!@current_user.thesis_project_users.where(:thesis_project_roles_id => rol_id).empty?
	end
end
