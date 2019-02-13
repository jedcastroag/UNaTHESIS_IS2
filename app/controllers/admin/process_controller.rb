class Admin::ProcessController < ApplicationController
    # skip_before_filter :verify_authenticity_token

    def new
        @new_student = User.new
    end

    def index; end

    def show
        # render @user
    end

    def create

        user = User.new(user_params)
        user.id = 6
        user.user_type_id = 2
        user.password = '12345678'
        user.password_confirmation = '12345678'
        user.name = "None"
        user.surname = "None"

        if user.save
            render json: user
        else
             render json: {error: "No se ha podido guardar el Usuario."}
        end
    end1

    private

    def user_params
        params.require(:process).permit(:email,:password_digest, :user_type_id, :name, :surname)
    end
end
