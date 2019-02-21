class JuryController < ApplicationController

    def search_project
        # authenticate_request!
        project = User.find_by(email: "jury@test.com").thesis_projects
        render json: project
    end

end
