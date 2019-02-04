class WelcomeController < ApplicationController
	def login
		def authenticate
			@username = params[:username]
			@password = params[:password]

			ldap = Net::LDAP.new
			ldap.host = "ldaprbog.unal.edu.co"
			ldap.port = 389
			ldap.authenticate "uid=#{@username},ou=people,o=bogota,o=unal.edu.co", @password

			return ldap.bind
		end
	end
end
