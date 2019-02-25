class ProjectController < ApplicationController 
    skip_before_action :verify_authenticity_token 
    def getProjectForUser
        sql = "select * from thesis_projects 
        inner join thesis_projects_users on thesis_projects.id = thesis_projects_users.thesis_project_id
        where thesis_projects_users.user_id = 2
        order by created_at desc limit 1;"
        project = ActiveRecord::Base.connection.exec_query(sql)                  
        render json: project
    end
end
