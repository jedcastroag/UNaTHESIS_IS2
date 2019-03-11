class JuryController < ApplicationController
    skip_before_action :verify_authenticity_token

    def initialize
        super User.user_type_ids.slice 'jury_tutor'
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
            project = ThesisProject.find(project_user.thesis_project_id)
            titles << { title: project.title, id: project.id }
        end
        
        render json: titles
    end

    def add_comment
        msg = ""
        if check_user
            comment = Comment.where(users_id: @current_user.id,
                thesis_project_id: jury_params[:thesis_project_id])
            if comment.empty?
                users_id = {:users_id => @current_user.id}
                params[:jury].merge! users_id
                comment = Comment.create(jury_params)
                if comment.id != nil
                    JuryMailer.with(:email => "jedcastroag@gmail.com").concept_created.deliver_now
                    msg = "Created and Saved"
                else
                    msg = "Created and Didn't Saved"
                end
    
            else
                if comment[0].update :content => jury_params[:content], :title => jury_params[:title]
                    msg = "Updated"
                else
                    msg = "Couldn't be updated"
                end
            end
             
            render json: {message: msg}
        else
            render json: {:message => "Invalid Request"}, status: :unauthorized
        end
    end

    def add_questions
        message = ""
        create_answer = ""
        if check_user
            questions = Question.where(user_id: @current_user.id,
                thesis_project_id: jury_params[:thesis_project_id])
            if questions.empty?
                i = 1
                params[:jury][:questions].each do |question|
                    if question != ""
                        if Question.create(
                            question: question,
                            user_id: @current_user.id,
                            thesis_project_id: jury_params[:thesis_project_id]
                        ) != nil
                            message << "Question " + i.to_s + " was created and saved\n"
                        else
                            message << "Question" + i.to_s + " couldn't be created and saved\n"
                        end
                        i += 1
                    end                    
                end
            else
                new_questions = params[:jury][:questions]
                if new_questions.length == questions.length
                    i = 0                    
                    questions.each do |question|
                        if question.update(question: new_questions[i])
                            message << "Question " + (i+1).to_s + " Updated \n"
                            i += 1
                        else
                            message << "Can't Update the question " + (i+1).to_s + "\n"
                        end
                    end
                else
                    if questions[0].update question: new_questions[0]
                        message << "Question " + 1.to_s + " Updated \n"
                    else
                        message << "Can't Update the question " + 1.to_s + "\n"
                    end
                    if Question.create(
                        question: new_questions[1],
                        user_id: @current_user.id,
                        thesis_project_id: jury_params[:thesis_project_id]
                    ) != nil
                        message << "Question " + 2.to_s + " Created \n"
                    else
                        message << "Question " + 2.to_s + " Can't be Created\n"
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

        comment = []
        if check_user
            comment_aux = Comment.where(
                users_id: @current_user.id,
                thesis_project_id: params[:thesis_project_id]
            )
            if !comment_aux.empty?
                comment << {
                    :title => comment_aux[0].title,
                    :content => comment_aux[0].content
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
                questions << {:question => question_obj.question}
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

end
