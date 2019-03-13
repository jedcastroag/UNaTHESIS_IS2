require 'securerandom'

class AdminController < ApplicationController
  skip_before_action :verify_authenticity_token
  def initialize
    super()
  end

  def fetch_users_data
    users = User.all.select :user_type_id, :name, :surname, :email,
                            :institution, :country, :dni, :id
    render json: users.to_json
  end

  def fetch_user_data
    user = User.where(id: params[:user_id]).select(:user_type_id,
                                                   :name, :surname, :email,
                                                   :institution, :country,
                                                   :dni).first
    
    render json: user.to_json
  end

  def edit_user
    user = User.find(params[:id])
    user.update_attribute(:name, params[:name])
    user.update_attribute(:surname, params[:surname])
    user.update_attribute(:email, params[:email])
    user.update_attribute(:dni, params[:dni])
    user.update_attribute(:user_type_id, params[:user_type].to_i)

    render json: 200
  end

  def fetch_user_types
    types = UserType.all
    render json: types.to_json
  end

  def delete_user
    ThesisProjectUser&.where(user_id: params[:user_id])&.each do |register|
      register.destroy
    end
    User.find(params[:user_id]).destroy
    render json: 200
  end

  def add_user
    pass = SecureRandom.hex(10)
    user = User.create(email: params[:email],
                       name: params[:name],
                       surname: params[:surname],
                       user_type_id: params[:user_type].to_i,
                       password: pass, dni: params[:dni])
    NewUserMailer.new_user(user, pass).deliver_now
    render json: 200
  end

  def fetch_projects
    projects = ThesisProject.all
    render json: projects.to_json
  end

  def delete_project
    ThesisProjectUser&.where(thesis_project_id: params[:project_id])&.each do |register| 
      register.destroy
    end
    ThesisProject&.find(params[:project_id])&.destroy
    render json: 200
  end

  def fetch_roles_project
    users = User.select('users.*, thesis_project_users.*')
                .joins('INNER JOIN thesis_project_users ON users.id = user_id')
                .where('thesis_project_users.thesis_project_id = ?', params[:id])
    render json: users.to_json
  end

  def fetch_project_data
    project = ThesisProject.find(params[:id])
    render json: project.to_json
  end

  def fetch_roles
    roles = ThesisProjectRole.all
    render json: roles.to_json
  end

  def create_project
    thesis = ThesisProject.create(title: params[:title])
    for i in (0..(params[:count_users].to_i) - 1)
      ThesisProjectUser.create thesis_project_id: thesis.id, user_id: params[:"user_#{i}"], 
      thesis_project_roles_id: params[:"user_type_#{i}"].to_i

      user = User.find(params[:"user_#{i}"])
      rol = ThesisProjectRole.find(params[:"user_type_#{i}"])
    AdminMailer.notify_assignation(user, thesis, rol).deliver_now
    end
    render json: 200
  end

  def asign_roles
    project = ThesisProject.find(params[:id_project])
    project.update_attribute(:title, params[:title])

    ThesisProjectUser&.where(thesis_project_id: params[:id_project])&.each do |register| 
      register.destroy
    end
    for i in (0..(params[:count_users].to_i) - 1)
      ThesisProjectUser.create(thesis_project_id: params[:id_project],
                               user_id: params[:"user_#{i}"],
                               thesis_project_roles_id: params[:"rol_#{i}"].to_i)
      user = User.find(params[:"user_#{i}"])
      project = ThesisProject.find(params[:id_project])
      rol = ThesisProjectRole.find(params[:"rol_#{i}"])
    AdminMailer.notify_assignation(user, project, rol).deliver_now

    end
    render json: 200
  end
end
