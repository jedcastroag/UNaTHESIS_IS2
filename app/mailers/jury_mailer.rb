class JuryMailer < ApplicationMailer
    default from: 'ptesis2019@gmail.com' 
    SUBJECTS = { :concept => {
            :created => "El concepto sobre el/la Proyecto de Tesis/ Tesis se ha subido",
            :updated => "El concepto sobre el/la Proyecto de Tesis/ Tesis se ha actualizado"
        },
        :questions => {
            :created => "Las preguntas de el/la Proyecto de Tesis/ Tesis se han subido",
            :updated => "Las preguntas de el/la Proyecto de Tesis/ Tesis se ha actualizado"
        }
    }
    
    def concept
        @emisor = params[:emisor]
        @user = params[:user]
        @subject_choice = params[:subject]
        mail(to: @user.email, subject: SUBJECTS[:concept][@subject_choice])
    end
    
    def questions
        @subject_choice = params[:subject]
        @emisor = params[:emisor]
        @user = params[:user]
        mail(to: @user.email, subject: SUBJECTS[:questions][@subject_choice] )
    end
    

end
