require 'securerandom'

class AdminController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def initialize
    super() 
  end
  
  def fetch_users_data
    users = User.all.select :user_type_id, :name, :surname, :email, :institution, :country, :dni, :id
    render json: users.to_json
  end
  
  def fetch_user_data
    user = User.where(email: params[:user_id]).first.select :user_type_id, 
    :name, :surname, :email, :institution, :country, :dni
    render json: user.to_json
  end
  
  def edit_user
    User.update(params[:id],
      :name => params[:name], :surname => params[:surname], 
      :user_type_id => params[:user_type].to_i)
      user = User.find(params[:id]).select :user_type_id, 
      :name, :surname, :email, :institution, :country, :dni
      render json: user.to_json
    end
    
    def delete_user
      User.find(params[:user_id]).destroy
      render json: 200
    end
    
    def add_user
      pass = SecureRandom.hex(10)
      user = User.create email: params[:email], name: params[:name], surname: params[:surname],
        user_type_id: params[:user_type], password: pass, dni: params[:dni]
      
      NewUserMailer.new_user(user, pass).deliver_now
        render json: 200
      end
      
      def fetch_projects
        projects = ThesisProject.all
        render json: projects.to_json
      end
      
      def delete_project
        ThesisProject.find(params[:project_id]).destroy
        render json: 200
      end
      
      def fetch_roles_project
        users = User.select('users.*, thesis_project_users.*')
        .joins('INNER JOIN thesis_project_users ON users.id = user_id')
        .where('thesis_project_users.thesis_project_id = ?', params[:id])
        render json: users.to_json
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
        end
        render json: 200
      end
      
      def asign_roles
        if(!ThesisProjectUser.find_by(thesis_project_id: params[:id_project]).nil?)
          ThesisProjectUser.find_by(thesis_project_id: params[:id_project]).destroy
        end
        for i in (0..(params[:count_users].to_i) - 1)
          ThesisProjectUser.create(thesis_project_id: params[:id_project], user_id: params[:"user_#{i}"], thesis_project_roles_id: params[:"rol_#{i}"].to_i)
        end  
        render json: 200
      end
    end
    