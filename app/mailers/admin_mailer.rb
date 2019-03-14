class AdminMailer < ApplicationMailer
	def notify_assignation(user, project, rol)
		@user = user
        @project = project
        @rol = rol
		mail(to: @user.email, subject: "Asignacion a proyecto de Tesis")
	end
end
