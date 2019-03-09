Rails.application.routes.draw do
  
  root 'users#new'
  get '/home', to: 'home#view'
  post '/login', to: 'sessions#create'
  post 'file/load_post', to: 'file#load_post'
  get '/users/:id', to: 'tutor#find'
  get '/project/find/:userId', to: 'project#getProjectForUser'
	get '/student/download_project', to: 'student#download_pdf'
  get 'admin/fetch_users_data', to: 'admin#fetch_users_data'
  get 'admin/fetch_projects', to: 'admin#fetch_projects'
  get 'admin/fetch_user_data', to: 'admin#fetch_user_data'
  get 'admin/fetch_roles_project', to: 'admin#fetch_roles_project'
  get 'admin/fetch_roles', to: 'admin#fetch_roles'
  get 'file/download_project', to: 'file#download_pdf'
	get 'jury/projects', to: 'jury#search_projects'
	get 'jury/comment', to: 'jury#get_comment'
  get 'jury/questions', to: 'jury#get_questions'
  get 'jury/download/:id', to: 'jury#download_pdf'
  match 'admin/delete_user', to: 'admin#delete_user', via: [:post]
  match 'admin/delete_project', to: 'admin#delete_project', via: [:post]
  match 'admin/add_user', to: 'admin#add_user', via: [:post]
  match 'admin/create_project', to: 'admin#create_project', via: [:post]
  get 'jury/projects', to: 'jury#search_projects'
  post 'jury/comment', to: 'jury#add_comment'
  post 'jury/questions', to: 'jury#add_questions'
  get 'tutor/projects', to: 'tutor#getProjectsForTutor'
  get '/tutor/download/:id', to: 'tutor#downloadPdfTutor'
  post 'tutor/upload_concept', to: 'tutor#save_thesis_concept'
  get '/getUserInfo', to: 'tutor#getActualUserInfo'		  
  
	resources :users

	get '*path', to: "users#new"
end
