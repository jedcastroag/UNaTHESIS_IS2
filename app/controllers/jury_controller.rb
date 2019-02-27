class JuryController < ApplicationController

    def search_projects
        authenticate_request!
        projects = User.find_by(email: "jury@test.com").thesis_projects
        titles = []
        projects.each do |project|
            titles << {title: project.title, id: project.id}
        end
        
        render json: titles
    end
    
    def get_project
        project = ThesisProject.find(jury_params)
        if project
            render json: project            
        else
            
        end
    end
    
    private
    
    def jury_params
        params.require(:jury).permit(:id)
    end

end
