# frozen_string_literal: true
require 'digest/md5'
require 'fileutils'

# FileController
class FileController < ApplicationController
  skip_before_action :verify_authenticity_token

  def download_pdf
    authenticate_request!

    thesis_project = @current_user.thesis_projects.last

    send_file(
      "#{Rails.root}/#{thesis_project.document}",
      filename: "#{ thesis_project.title }.pdf",
      type: "application/pdf"
      )
  rescue => error
    if Rails.env.production?
      render json: { error: "Bad request" }, status: :unauthorized
    else
      render json: { error: error }, status: :unauthorized
    end
  end

  def downloadPdfTutor
    thesis_project = ThesisProject.find(params[:id])
    
    send_file(
      "#{Rails.root}/#{thesis_project.document}",
      filename: "#{ thesis_project.title }.pdf",
      type: "application/pdf"
    )
  rescue => error
    if Rails.env.production?
      render json: { error: "Bad request" }, status: :unauthorized
    else
      render json: { error: error }, status: :unauthorized
    end
  end

  def load_post
    authenticate_request!    
    file_path = process_file(
      params[:file],
      Time.now.strftime('%Y%m%d_%H%M%S') + '.pdf'
      )
    
    thesis_project = ThesisProject.create(
      document: file_path,
      approbation_state: 0,
      activation_state: 0, 
      description: params[:project_description],
      title: params[:project_title]
      )

    @current_user.thesis_projects << thesis_project
    @current_user.save
  rescue => error
    if Rails.env.production?
      render json: { error: "Bad request" }, status: :unauthorized
    else
      render json: { error: error }, status: :unauthorized
    end
  end

  private

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
    destiny_dir = "files/#{Digest::MD5.hexdigest(user_id.to_s)}/#{file_name}"
    FileUtils.mv(file_path, destiny_dir)
    return destiny_dir
  end
end
