class Admin::ProcessController < ApplicationController

	def new
        @new_student = User.new
    end

    def index

    end

    def show
    end

    def create 

    	temp_password = ""
    	8.times{temp_password << ((rand(2)==1?65:97) + rand(25)).chr}
    	@new_student = User.new(user_params)
    	@new_student.user_type_id = "EST"
    	@new_student.email  = @new_student.user_name + "@unal.edu.co"
        @new_student.temp_password = temp_password; 
        @new_student.password = @new_student.temp_password
        @new_student.password_confirmation = @new_student.temp_password
        
        if @new_student.save
        	redirect @new_student
        else
        	render "new"
        end
    end

    private

    	def user_params
	    	params.require(:user).permit!(:user_name, :email, :password, :)	    	
	    end    
end
