class HomeController < ApplicationController
	#GET Method
	def view
		authenticate_request!

		@current_user
	end
end