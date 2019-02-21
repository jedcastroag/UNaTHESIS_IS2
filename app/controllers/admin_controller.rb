class AdminController < ApplicationController
    skip_before_action :verify_authenticity_token

  def fetch_users_data
    users = User.all
    render json: users.to_json
  end

  def fetch_user_data
    user = User.where(email: params[:user_id]).first
  	render json: user.to_json
  end

  def edit_user
    User.update(params[:id], 
      :name => params[:name], :surname => params[:surname], 
      :user_type_id => params[:user_type].to_i)
    user = User.find(params[:id])
  	render json: user.to_json
  end

  def delete_user
    User.find(params[:id]).destroy
  end
end
