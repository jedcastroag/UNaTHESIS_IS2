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
			thesis_project = @current_user.thesis_projects.where(activation_state: true).last

			users = thesis_project.related_users(@current_user).as_json if thesis_project

			student = {
				:activated => @current_user.activated,
				:thesis => thesis_project, 
				:comments => thesis_project&.comments || [],
				:users => users || []
			}
			body.merge! student
		when 'jury_tutor'
			jury_tutor = {
				:is_jury => true, #(is_rol? :jury),
				:is_tutor => true, #(is_rol? :tutor),
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
		render json: { error: error }, status: :bad_request
	end

	private

	def is_rol? (rol_id)
		!@current_user.thesis_project_users.where(:thesis_project_roles_id => rol_id).empty?
	end
end
