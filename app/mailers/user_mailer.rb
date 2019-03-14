class UserMailer < ApplicationMailer
    def password_reset(user)
        @user = user
        mail to: user.email, subject: "Reestablecimiento de la contraseña"
    end
end
