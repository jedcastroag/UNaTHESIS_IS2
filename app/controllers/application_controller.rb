class ApplicationController < ActionController::Base
	before_action :verify_authentication_request! 

	def initialize (allowed_users = {})
		super()
		@allowed_users = User.user_type_ids.slice('admin').merge! allowed_users
	end

	protected
	def verify_authentication_request!
		decoded = payload
		raise 'Invalid Request (Bad API Token)' unless decoded

		load_user decoded
		raise 'User not found' unless @current_user

		raise 'Unauthorized user' unless @allowed_users.include? @current_user.user_type_id
	rescue => error
		render json: { error: error }, status: :unauthorized
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