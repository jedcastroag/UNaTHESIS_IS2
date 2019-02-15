class HomeController < ApplicationController
	#GET Method
	def view
		authenticate_request!

		body = {
			:user_type_id => @current_user.user_type_id
		}

		case @current_user.user_type_id
		when 1 # Administrator

		when 2 # Student
			thesis_project = @current_user.thesis_projects.last
			student = { 
				:thesis => thesis_project, 
				:comments => thesis_project&.comments,
				:users => thesis_project.users
			}
			body.merge! student
		when 3 # Tutor

		when 4 # Jury

		else
			raise 'Invalid Request'
		end

		render json: body
	rescue => error
		render json: { error: error }, status: :unauthorized
	end
end