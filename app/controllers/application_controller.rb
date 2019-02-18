require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

	protected
	def authenticate_request!
		decoded = payload
		
		unless decoded
			puts "DECODED: #{decoded}"
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
		puts "ERROR: #{error}"
		false
	end

	def load_user(payload)
		@current_user = User.find_by(id: payload['user_id'])
	end
end