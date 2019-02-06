class UsersController < ApplicationController
	skip_before_action :verify_authenticity_token#, except: [:create]

	def index
		render json: User.all.to_json(only: [:email, :created_at])
	end

	def create
		user = User.new(user_params)

		if user.save
			render json: user.to_json
		else
			if Rails.env.production?
				render json: {error: "Error trying to create new user" }
			else
				render json: {error: user.errors.to_json }, status: :unprocessable_entity
			end
		end
	end

	private
	def user_params
		params.require(:user).permit(:email, :password, :name)
	end
end
