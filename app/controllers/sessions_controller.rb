require 'rubygems'
require 'net/ldap'

class SessionsController < ApplicationController
	skip_before_action :verify_authenticity_token, :verify_authentication_request!

	# POST method
	def create
		if user_params[:email].end_with? "unal.edu.c"
			user_params[:email].slice! "@unal.edu.co"
			#ans = ldap_validation user_params[:email], user_params[:password]
			if(ans)
				render json: { error: "Unal email #{ans}"  }
			else
				render json: { error: "Bad credentials" }, status: :unauthorized
			end
		else
			user = User.find_by(email: user_params[:email].downcase)
			if user && user.authenticate(user_params[:password])
				render json: { token: generateToken(user) }
			else
				render json: { error: "Bad credentials" }, status: :unauthorized
			end
		end
	end

	# GET method
	def new
	end

	private
	def generateToken(user)
		payload = { user_id: user.id }
		TokenService.instance.encode payload, 1.minutes.from_now.to_i
	end

	def user_params
		params.require(:session).permit(:email, :password)
	end

	def ldap_validation(username, password)
		ldap = Net::LDAP.new
		ldap.host = "ldaprbog.unal.edu.co"
		ldap.port = 389
		ldap.authenticate "uid=#{username},ou=people,o=bogota,o=unal.edu.co", password
		return ldap.bind
	end
end
