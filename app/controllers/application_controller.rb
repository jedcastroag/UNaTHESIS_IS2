class ApplicationController < ActionController::Base
	protected
	def authenticate_request!
		decoded = payload
		
		return invalid_authentication unless decoded
		puts decoded

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

	def invalid_authentication
		render json: { error: 'Invalid Request' }, status: :unauthorized
	end
end