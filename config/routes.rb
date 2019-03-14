Rails.application.routes.draw do
  get 'change_password/create'
  get 'change_password/new'
  root 'users#new'

  get '/home', to: 'home#view'

  post '/login', to: 'sessions#create', as: :login
  post 'file/load_post', to: 'file#load_post'
  get '/users/:id', to: 'tutor#find'
  get '/project/find/:userId', to: 'project#getProjectForUser'
	get '/student/download_project', to: 'student#download_pdf'
  get 'admin/fetch_users_data', to: 'admin#fetch_users_data'
  get 'admin/fetch_projects', to: 'admin#fetch_projects'
  get 'admin/fetch_user_data', to: 'admin#fetch_user_data'
  get 'admin/fetch_roles_project', to: 'admin#fetch_roles_project'
  get 'admin/fetch_roles', to: 'admin#fetch_roles'
  get 'admin/fetch_user_types', to: 'admin#fetch_user_types'
  get 'admin/fetch_project_data', to: 'admin#fetch_project_data'
  get 'file/download_project', to: 'file#download_pdf'
	get 'jury/projects', to: 'jury#search_projects'
	get 'jury/comment', to: 'jury#get_comment'
  get 'jury/questions', to: 'jury#get_questions'
  get 'jury/download/:id', to: 'jury#download_pdf'
  get 'jury/:thesis_project_id', to: 'jury#getStudentInfo'
  post 'admin/delete_user', to: 'admin#delete_user'
  post 'admin/delete_project', to: 'admin#delete_project'
  post 'admin/add_user', to: 'admin#add_user'
  post 'admin/edit_user', to: 'admin#edit_user'
  post 'admin/create_project', to: 'admin#create_project'
  post 'admin/asign_roles', to: 'admin#asign_roles'
  post 'admin/deactivate_project', to: 'admin#deactivate_project'
  post 'admin/activate_project', to: 'admin#activate_project'

  get '/getUserInfo', to: 'jury_tutor#getUserInfo'
  post 'jury/comment', to: 'jury#add_comment'
  post 'jury/questions', to: 'jury#add_questions'
  get 'tutor/projects', to: 'tutor#getProjectsForTutor'
  get '/tutor/download/:id', to: 'tutor#downloadPdfTutor'
  post 'tutor/upload_concept', to: 'tutor#save_thesis_concept'
  post '/change_password', to: 'change_password#create'
  
  resources :users
  resources :password_resets, only: [:new, :create, :edit, :update]

	get '*path', to: "users#new"
end
