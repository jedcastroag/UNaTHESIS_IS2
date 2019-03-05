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
		sqlGetProjects = "select distinct thesis_project_id from thesis_projects_users where user_id = " + tutorId + ";"		
		res = ActiveRecord::Base.connection.exec_query(sqlGetProjects)
		studentsArr = []
		res.each do |val|
			projectId = val['thesis_project_id'].to_s			
			sqlGetStudents = "SELECT distinct user_id FROM thesis_projects_users
			WHERE thesis_project_id = " + projectId + " AND thesis_project_rol_id = 1;"
			students = ActiveRecord::Base.connection.exec_query(sqlGetStudents)
			studentsArr.push(students[0]['user_id'])			
		end		
		studentsArr = studentsArr.to_set
		projectsArray = []
		studentsArr.each do |val|
			studentId = val.to_s
			getProjectForStudent = "SELECT thesis_projects.*, user_id as id_estudiante
			FROM thesis_projects_users
			INNER JOIN thesis_projects ON thesis_projects_users.thesis_project_id = thesis_projects.id
			WHERE thesis_projects_users.user_id = " + studentId +" ORDER BY created_at DESC LIMIT 1;"
			project = ActiveRecord::Base.connection.exec_query(getProjectForStudent)
			projectsArray.push(project)			
		end
		
		render json: projectsArray.to_json
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
