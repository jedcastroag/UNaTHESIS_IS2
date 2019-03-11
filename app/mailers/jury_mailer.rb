class JuryMailer < ApplicationMailer
    default from: 'ptesis2019@gmail.com' 
    Concept_created_subject = "The ThesisProject/Thesis Concept has been Uploaded"
    @URL = "localhost:5000/login"

    def concept_created
        @user = params[:email]
        mail(to: @user, subject: Concept_created_subject )
    end
    

end
