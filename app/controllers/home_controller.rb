class HomeController < ApplicationController

	TUTOR_ROLE_ID = 2
	JURY_ROLE_ID = 3

	#GET Method
	def view
		authenticate_request!

		body = {
			:user_type_id => @current_user.user_type_id
		}

		case @current_user.user_type_id
		when 'admin' # Administrator

		when 'student' # Student
			thesis_project = @current_user.thesis_projects.last
			student = {
				:thesis => thesis_project,
				:comments => thesis_project&.comments || [],
				:users => thesis_project&.users || []
			}
			body.merge! student
		when 'jury_tutor' # Jury

			jury_tutor = {
				:is_jury => (is_rol? :jury),
				:is_tutor => true # To Define
			}

			body.merge! jury_tutor
		else
			raise 'Invalid Request'
		end

		render json: body
	rescue => error
		render json: { error: error }, status: :unauthorized
	end

	private

	def is_rol? (rol_id)
		!@current_user.thesis_project_users.where(:thesis_project_rols_id => rol_id).empty?
	end
	


end
