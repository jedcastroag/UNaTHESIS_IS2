class PasswordResetsController < ApplicationController
  skip_before_action :verify_authenticity_token, :verify_authentication_request!
  
  before_action :get_user, only: [:edit, :update]
  before_action :valid_user, only: [:edit, :update]
  before_action :check_expiration, only: [:edit, :update]
  
  def create
    @user = User.find_by email: params[:email].downcase
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email
    else
      render json: { error: "User not found" }, status: :bad_request
    end
  end
  
  def new
  end
  
  def edit
  end
  
  def update
    if params[:user][:password].empty? || params[:user][:password_confirmation].empty?
      render json: { error: "Password or password confirmation is empty" }, 
      status: :bad_request
    elsif !@user.update_attributes user_params
      render json: { error: "Error tryng to update the password" }, status: :bad_request
    else
      render json: { success: "SUCCESS!" }
    end
  end
  
  private
  def check_expiration
    if @user.password_reset_expired?
      render json: { error: "Password reset token has expired." }, status: :bad_request
    end
  end
  
  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
  
  def get_user
    @user = User.find_by email: params[:email]
  end
  
  def valid_user
    return render json: { error: "User not found" }, status: :bad_request unless @user
    return render json: { error: "Token not valid" }, status: :bad_request unless @user.validate_reset_token params[:id]
  end
end