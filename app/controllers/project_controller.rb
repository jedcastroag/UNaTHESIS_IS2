class ProjectController < ApplicationController  
    def getProjectForUser
        project = ThesisProject.find(2)
        render json: project.to_json
    end
end
