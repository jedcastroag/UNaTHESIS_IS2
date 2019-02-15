# frozen_string_literal: true
require 'digest/md5'
require 'fileutils'

# FileController
class FileController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def load_post
    file_path = process_file(
      params[:file],
      Time.now.strftime('%Y%m%d_%H%M%S') + '.pdf'
    )
    thesis_project = ThesisProject.create(document: file_path,
                                          approbation_state: 0,
                                          activation_state: 0)
    ThesisProjectUser.create(id_user:1,
                             id_thesis_project: thesis_project.id,
                             id_thesis_project_rol:0)
  end

  private

  def process_file(file, name)
    create_file_folder_of_user(1)
    return move_file_to_user_folder(1,
                             file.path,
                             name)
  end

  def create_file_folder_of_user(user_id)
    directory = 'files'
    FileUtils.mkdir_p directory unless File.exist?(directory)
    id_md5 = Digest::MD5.hexdigest(user_id.to_s)
    directory = directory + '/' + id_md5
    FileUtils.mkdir_p directory unless File.exist?(directory)
  end

  def move_file_to_user_folder(user_id, file_path, file_name)
    destiny_dir = 'files/' + Digest::MD5.hexdigest(user_id.to_s) + '/' + file_name
    FileUtils.mv(file_path, destiny_dir)
    return destiny_dir
  end
end
