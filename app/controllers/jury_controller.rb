class JuryController < ApplicationController

    def search_projects
        authenticate_request!
        projects = User.find_by(email: "jury@test.com").thesis_projects
        titles = []
        projects.each do |project|
            titles << project.title
        end
        
        render json: titles
    end
    # 
    # def get_project
    #     project = ThesisProject.find(params)
    # end
    #
    # private
    #
    # def jury_params
    #
    # end

end
