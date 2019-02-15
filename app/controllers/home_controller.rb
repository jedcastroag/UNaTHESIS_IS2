class HomeController < ApplicationController
	#GET Method
	def view
		authenticate_request!

		if @current_user != nil
			render json: { user: @current_user }
		end
	end
end