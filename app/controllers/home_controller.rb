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
			student = { 
				:thesis => thesis_project, 
				:comments => thesis_project&.comments,
				:users => thesis_project&.users
			}
			body.merge! student
		when 'jury_tutor'
			jury_tutor = {
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
end