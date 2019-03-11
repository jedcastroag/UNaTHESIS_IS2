class ChangePasswordController < ApplicationController
  skip_before_action :verify_authenticity_token

  def initialize
    super User.user_type_ids
  end

  def create
    if @current_user.authenticate params[:current_password]
      @current_user.change_password params[:new_password], params[:new_password_confirmation]
    else
      raise "Authentication failed"
    end
  rescue => error
    render json: { error: error }, status: :bad_request
  end
end
