class JuryMailer < ApplicationMailer
    default from: 'ptesis2019@gmail.com' 
    SUBJECTS = {
        :created => "The ThesisProject/Thesis Concept has been Uploaded",
        :updated => "The ThesisProject/Thesis Concept has been Updated"
    }
    
    def concept
        @emisor = params[:emisor]
        @user = params[:user]
        @subject_choice = params[:subject]
        mail(to: @user.email, subject: SUBJECTS[@subject_choice])
    end
    
    # def concept_updated
    #     @URL = Url
    #     @emisor = params[:emisor]
    #     @user = params[:user]
    #     mail(to: @user.email, subject: Concept_updated_subject )
    # end
    

end
