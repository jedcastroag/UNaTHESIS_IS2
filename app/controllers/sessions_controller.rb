require 'rubygems'
require 'net/ldap'

class SessionsController < ApplicationController
	skip_before_action :verify_authenticity_token#, except: [:create]

	# POST method
	def create
		if user_params[:email].end_with? "unal.edu.co"
			render json: { error: "Unal email" }, status: :unauthorized
			#ans = ldap_validation user_params[:email], user_params[:password]
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

	def generateToken(user)
		payload = { id: user.id }
		jwt = JWT.encode(payload, Rails.application.credentials.secret_key_base)
		return jwt
	end
end
