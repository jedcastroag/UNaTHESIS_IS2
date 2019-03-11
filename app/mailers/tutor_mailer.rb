class TutorMailer < ApplicationMailer
    def concept_notice(userName, userEmail, projectTitle)
        @userName = userName
        @userEmail = userEmail
        @projectTitle = projectTitle
        mail(to: @userEmail, subject: "Servicio de notificaciones UNaTesis")        
    end
end
