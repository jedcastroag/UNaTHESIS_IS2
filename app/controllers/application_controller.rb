class ApplicationController < ActionController::Base
	protected
	def authenticate_request!
		decoded = payload
		
		unless decoded
			raise 'Invalid Request'
		end

		load_user decoded
		invalid_authentication unless @current_user
	end

	private
	def payload
		payload = request.headers['Authorization'].split().last
		TokenService.instance.validate payload
	rescue Exception => error
		false
	end

	def load_user(payload)
		@current_user = User.find_by(id: payload['user_id'])
	end
end