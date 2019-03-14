class JuryTutorController < ApplicationController
    skip_before_action :verify_authenticity_token

    def initialize
        super User.user_type_ids.slice 'jury_tutor'
    end

    def getUserInfo
        render json: @current_user.attributes.except("id", "password_digest", "created_at", "updated_at")
    end    
    
end