class ProjectController < ApplicationController 
    skip_before_action :verify_authenticity_token     

    def initialize
        super User.user_type_ids.slice 'jury_tutor'
    end
    def getProjectForUser
        userId = params[:userId].to_s
        sql = "select * from thesis_projects 
        inner join thesis_projects_users on thesis_projects.id = thesis_projects_users.thesis_project_id
        where thesis_projects_users.user_id = " + userId + " order by created_at desc limit 1;"
        
        project = ActiveRecord::Base.connection.exec_query(sql)                  
        render json: project
    end
end
