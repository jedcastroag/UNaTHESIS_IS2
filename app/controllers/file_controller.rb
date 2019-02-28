require 'digest/md5'
require 'fileutils'

# FileController
class FileController < ApplicationController
  
  def initialize
    super User.user_type_ids.slice 'student'
  end

  def load_post
    authenticate_request!

    file_name = Time.now.strftime('%Y%m%d_%H%M%S') + '.pdf'
    
    thesis_project = ThesisProject.create document: create_path(@current_user.id, file_name),
    approbation_state: 0, activation_state: 0, description: params[:project_description], 
    title: params[:project_title]
    
    thesis_project_user = ThesisProjectUser.new user: @current_user,
    thesis_project: thesis_project, thesis_project_rols_id: "author"

    if thesis_project_user.save
      file_path = process_file params[:file], file_name
    else
      thesis_project.delete 
      raise 'Thesis project user not valid'
    end
  rescue => error
    if Rails.env.production?
      render json: { error: "Bad request" }, status: :unauthorized
    else
      render json: { error: error }, status: :unauthorized
    end
  end
  
  private
  def create_path(user_id, file_name)
    "files/#{Digest::MD5.hexdigest(user_id.to_s)}/#{file_name}"
  end

  def process_file(file, name)
    create_file_folder_of_user(@current_user.id)
    return move_file_to_user_folder(@current_user.id, file.path, name)
  end
  
  def create_file_folder_of_user(user_id)
    directory = 'files'
    FileUtils.mkdir_p directory unless File.exist?(directory)
    
    id_md5 = Digest::MD5.hexdigest(user_id.to_s)
    directory = directory + '/' + id_md5
    FileUtils.mkdir_p directory unless File.exist?(directory)
  end
  
  def move_file_to_user_folder(user_id, file_path, file_name)
    destiny_dir = create_path user_id, file_name
    FileUtils.mv(file_path, destiny_dir)
    return destiny_dir
  end
end
