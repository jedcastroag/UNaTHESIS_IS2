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
    if (params[:password].blank? || params[:password_confirmation].blank?) && 
      (params[:user].blank? || params[:user][:password].blank? || params[:user][:password_confirmation].blank?)
      render json: { error: "Password or password confirmation is empty" }, 
      status: :bad_request
    elsif !@user.update_attributes user_params
      render json: { error: "Error trying to update the password" }, status: :bad_request
    else
      @user.update_attribute :reset_digest, nil
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
    return params.permit(:password, :password_confirmation) if params[:user].blank?
    params.require(:user).permit(:password, :password_confirmation)
  end
  
  def get_user
    @user = User.find_by email: params[:email]
  end
  
  def valid_user
    return render json: { error: "User not found" }, status: :bad_request unless @user
    render json: { error: "Token not valid" }, status: :unauthorized unless @user.validate_reset_token params[:id]
  rescue => error
    render json: { error: error }, status: :unauthorized
  end
end