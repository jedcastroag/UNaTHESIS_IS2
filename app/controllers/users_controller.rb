class UsersController < ApplicationController
	skip_before_action :verify_authenticity_token#, except: [:create]

	def index
		render json: User.all.to_json(only: [:email, :created_at])
	end

	def getActualUserInfo
		authenticate_request!
		render json: @current_user
	end

	def find			
		user = User.find(params[:id])
		render json: user.to_json
	end

	def getProjectsForTutor		
		authenticate_request!
		tutor = @current_user
		tutorId = tutor.id.to_s		
		sql = "SELECT thesis_projects.*, t_users.user_id AS id_tutor, t_users_2.user_id AS id_estudiante
		FROM  thesis_projects_users t_users 
		INNER JOIN thesis_projects ON t_users.thesis_project_id = thesis_projects.id
		INNER JOIN  thesis_projects_users t_users_2 ON t_users_2.thesis_project_id = thesis_projects.id
		WHERE t_users.thesis_project_rol_id = 2 AND t_users.user_id = " + tutorId + " AND t_users_2.thesis_project_rol_id = 1;"
		
		projects = ActiveRecord::Base.connection.exec_query(sql)		
		render	json: projects.to_json
	end

	def create
		user = User.new(user_params)

		if user.save
			render json: user.to_json
		else
			if Rails.env.production?
				render json: {error: "Error trying to create new user" }
			else
				render json: {error: user.errors.to_json }, status: :unprocessable_entity
			end
		end
	end

	def home
		user = User.find_by(id: 3)
		
		data = {}

		if(user.user_type_id == 1)
			thesisProjectUser = ThesisProjectsUser.find_by(user_id: user.id)
			data[:thesis_info] = ThesisProject.find_by(id: thesisProjectUser.id)
		end

		render json: {
			user_type_id: 1,
			data: headers
		}
	end

	private
	def user_params
		params.require(:user).permit(:email, :password, 
			:name, :surname, :user_type_id)
	end
end
