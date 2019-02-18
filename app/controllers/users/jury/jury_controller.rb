class Users::Jury::JuryController < ApplicationController

    def index

    end

    def create
        render json: jurado_params
    end

    private

    def jurado_params
        params.require(:jury).permit(:comment_title, :comment_content)
    end

end
