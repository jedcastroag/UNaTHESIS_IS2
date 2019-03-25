class JuryController < ApplicationController
    skip_before_action :verify_authenticity_token

    def initialize
        super User.user_type_ids.slice 'jury_tutor'
    end

    def getStudentInfo
        student = ThesisProject.find(params[:thesis_project_id]).thesis_project_users.find_by(:thesis_project_roles_id => :author).attributes["user_id"]
        render json: User.find(student).attributes.except("id", "password_digest", "created_at", "updated_at")
    end

    def download_pdf
        thesis_project = @current_user.thesis_projects.find(params[:id])
        
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

    def search_projects
        project_users = @current_user.thesis_project_users.where(:thesis_project_roles_id => :jury)
        titles = []
        project_users.each do |project_user|
            project = ThesisProject.find_by(id: project_user.thesis_project_id, activation_state: true)
            if !project.nil? and !project.document.nil?
                titles << { title: project.title, id: project.id }
            end
        end
        
        render json: titles
    end

    def add_comment
        msg = ""
        if check_user
            comment = Comment.where(users_id: @current_user.id,
                thesis_project_id: jury_params[:thesis_project_id])
            student_id = ThesisProject.find(jury_params[:thesis_project_id]).thesis_project_users.find_by(:thesis_project_roles_id => :author).user_id
            if comment.empty?
                users_id = {:users_id => @current_user.id}
                params[:jury].merge! users_id
                comment = Comment.create(jury_params)
                if comment.id != nil                    
                    JuryMailer.with(:user => User.find(student_id), :emisor => @current_user, :subject => :created).concept.deliver_now
                    msg = "Concepto creado y guardado"
                else
                    msg = "No se pudo crear el Concepto"
                end
    
            else
                if comment[0].update :content => jury_params[:content], :title => jury_params[:title]
                    JuryMailer.with(:user => User.find(student_id), :emisor => @current_user, :subject => :updated).concept.deliver_now
                    msg = "Concepto actualizado"
                else
                    msg = "No se pudo actualizar el Concepto"
                end
            end
             
            render json: {message: msg}
        else
            render json: {:message => "Invalid Request"}, status: :unauthorized
        end
    end

    def add_questions
        puts params

        message = ""
        create_answer = ""
        any_quest_created_or_updated = false
        if check_user
            questions = Question.where(user_id: @current_user.id,
                thesis_project_id: jury_params[:thesis_project_id])
            student_id = ThesisProject.find(jury_params[:thesis_project_id]).thesis_project_users.find_by(:thesis_project_roles_id => :author).user_id
            if questions.empty?
                i = 1
                params[:jury][:questions].each do |content|
                    if content != ""
                        if Question.create(
                            content: content,
                            user_id: @current_user.id,
                            thesis_project_id: jury_params[:thesis_project_id]) != nil
                            
                            any_quest_created_or_updated = true
                            message << "La pregunta " + i.to_s + " fue creada y guardada\n"
                        else
                            message << "La pregunta " + i.to_s + " no se pudo crear\n"
                        end
                        i += 1
                    end                    
                end
                if any_quest_created_or_updated
                    JuryMailer.with(:user => User.find(student_id), :emisor => @current_user, :subject => :created).questions.deliver_now
                end
            else
                new_questions = params[:jury][:questions]
                if new_questions.length == questions.length
                    i = 0                    
                    questions.each do |question|
                        if question.update(content: new_questions[i])
                            any_quest_created_or_updated = true
                            message << "La pregunta " + (i+1).to_s + " se ha actualizado \n"
                            i += 1
                        else
                            message << "No se pudo actualizar la pregunta " + (i+1).to_s + "\n"
                        end
                    end
                    if any_quest_created_or_updated 
                        JuryMailer.with(:user => User.find(student_id), :emisor => @current_user, :subject => :updated).questions.deliver_now
                    end
                else
                    if questions[0].update content: new_questions[0]
                        any_quest_created_or_updated = true
                        message << "La pregunta " + 1.to_s + " fue actualizado \n"
                    else
                        message << "No se pudo actualizar la pregunta " + 1.to_s + "\n"
                    end
                    if Question.create(
                        content: new_questions[1],
                        user_id: @current_user.id,
                        thesis_project_id: jury_params[:thesis_project_id]
                    ) != nil
                        JuryMailer.with(:user => User.find(student_id), :emisor => @current_user, :subject => :updated).questions.deliver_now
                        message << "La pregunta " + 2.to_s + " fue creada y guardada\n"
                    else
                        message << "La pregunta " + 2.to_s + " No se pudo crear\n"
                    end
                end
            end
        else
            render json: {:message => :jury_tutor}, status: :unauthorized
            return
        end
        render json: {:message => message}
    end

    def get_comment

        comment = {}
        if check_user
            comment_aux = Comment.find_by(
                users_id: @current_user.id,
                thesis_project_id: params[:thesis_project_id]
            )
            if !comment_aux.nil?
                comment = {
                    :title => comment_aux.title,
                    :content => comment_aux.content
                }
            end
            
        else
            render json: comment, status: :unauthorized
            return
        end    
        render json: comment
    end
    
    def get_questions

        questions = []
        if check_user
            questions_aux = Question.where(
                user_id: @current_user.id,
                thesis_project_id: params[:thesis_project_id]
            )            
            questions_aux.each do |question_obj|
                questions << {:content => question_obj.content}
            end
        end    
        render json: questions
    end    
    
    private

    def check_user
        @current_user.user_type_id.intern == :jury_tutor
    end
    
    def jury_params
        params.require(:jury).permit(:title, :content, :thesis_project_id, :users_id)
    end    

    def jury_user_params
        params.require(:jury).permit(:country, :email, :name, :surname, :institution)
    end 

end
