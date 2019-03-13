# frozen_string_literal: true

class TutorController < ApplicationController
  skip_before_action :verify_authenticity_token

  def initialize
    super User.user_type_ids.slice 'jury_tutor'
  end

  def getActualUserInfo
    render json: @current_user
  end

  def getProjectsForTutor
    tutor = @current_user
    tutorId = tutor.id.to_s
    sqlGetProjects = 'select distinct thesis_project_id from thesis_project_users where user_id = ' + tutorId + ';'
    res = ActiveRecord::Base.connection.exec_query(sqlGetProjects)
    studentsArr = []
    res.each do |val|
      projectId = val['thesis_project_id'].to_s
      sqlGetStudents = "SELECT distinct user_id FROM thesis_project_users
			WHERE thesis_project_id = " + projectId + ' AND thesis_project_roles_id = 1;'
      students = ActiveRecord::Base.connection.exec_query(sqlGetStudents)
      studentsArr.push(students[0]['user_id'])
    end
    studentsArr = studentsArr.to_set
    projectsArray = []
    studentsArr.each do |val|
      studentId = val.to_s
      getProjectForStudent = "SELECT thesis_projects.*, user_id as id_estudiante
			FROM thesis_project_users
			INNER JOIN thesis_projects ON thesis_project_users.thesis_project_id = thesis_projects.id
			WHERE thesis_project_users.user_id = " + studentId + ' ORDER BY created_at DESC LIMIT 1;'
      project = ActiveRecord::Base.connection.exec_query(getProjectForStudent)
      projectsArray.push(project)
    end

    render json: projectsArray.to_json
    end

  def downloadPdfTutor
    thesis_project = ThesisProject.find(params[:id])

    send_file(
      "#{Rails.root}/#{thesis_project.document}",
      filename: "#{thesis_project.title}.pdf",
      type: 'application/pdf'
    )
  rescue StandardError => error
    if Rails.env.production?
      render json: { error: 'Bad request' }, status: :unauthorized
    else
      render json: { error: error }, status: :unauthorized
    end
  end

  def save_thesis_concept
    file_path = process_file(
      params[:file],
      Time.now.strftime('%Y%m%d_%H%M%S') + '.pdf'
    )

    state = params[:estado] == 'approved'
    ThesisProject.where(id: params[:projectId]).update_all(approbation_state: state, updated_at: Time.now.strftime('%Y%m%d_%H%M%S'))
    Comment.create(
      thesis_project_id: params[:projectId],
      users_id: @current_user.id,
      title: 'Comentarios adicionales revision tesis',
      content: params[:comentarios],
      created_at: Time.now.strftime('%Y%m%d_%H%M%S'),
      updated_at: Time.now.strftime('%Y%m%d_%H%M%S')
    )
    date = Time.now.strftime('%Y%m%d_%H%M%S')
    sql = "INSERT into support_documents (document, created_at, updated_at) values ('" + file_path + "','" + date + "','" + date + "');"
    ActiveRecord::Base.connection.exec_query(sql)

    user_name = params[:student_name]
    user_email = params[:student_email]
    project_title = params[:project_title]
    TutorMailer.concept_notice(user_name, user_email, project_title).deliver_now
  end

  def process_file(file, name)
    create_file_folder_of_user(@current_user.id)
    move_file_to_user_folder(@current_user.id, file.path, name)
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
    destiny_dir
  end

  def create_path(user_id, file_name)
    "files/#{Digest::MD5.hexdigest(user_id.to_s)}/#{file_name}"
  end

  def find
    user = User.find(params[:id])
    render json: user.to_json
  end
end
