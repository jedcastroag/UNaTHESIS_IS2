class StudentController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def download_pdf
        authenticate_request!
    
        thesis_project = @current_user.thesis_projects.last
    
        send_file(
          "#{Rails.root}/#{thesis_project.document}",
          filename: "#{ thesis_project.title }.pdf",
          type: "application/pdf"
          )
      rescue => error
        if Rails.env.production?
          render json: { error: "Bad request" }, status: :unauthorized
        else
          render json: { error: error }, status: :unauthorized
        end
      end
end