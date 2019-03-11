class NewUserMailer < ApplicationMailer
	def new_user(user, password)
		@user = user
		@password = password
		mail(to: @user.email, subject: "Bienvenido a UNaTesis")
	end
end
