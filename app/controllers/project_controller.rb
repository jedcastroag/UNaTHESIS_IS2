class ProjectController < ApplicationController 
    skip_before_action :verify_authenticity_token     

    def initialize
        super User.user_type_ids.slice 'jury_tutor'
    end
    def getProjectForUser        
        userId = params[:userId].to_s        
        sql = "select * from thesis_projects 
        inner join thesis_project_users on thesis_projects.id = thesis_project_users.thesis_project_id
        where thesis_project_users.user_id = " + userId + " order by thesis_projects.created_at desc limit 1;"
        
        project = ActiveRecord::Base.connection.exec_query(sql)            
        render json: project
    end
end
