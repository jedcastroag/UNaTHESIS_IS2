Rails.application.routes.draw do
	root 'users#new'

	get '/home', to: 'home#view'
	get '/users/:id', to: 'users#find'
	get '/project/find/:userId', to: 'project#getProjectForUser'
	get '/student/download_project', to: 'student#download_pdf'
	post '/login', to: 'sessions#create'
	post 'file/load_post', to: 'file#load_post'
	get 'jury_projects', to: 'jury#search_projects'
	post 'jury_comment', to: 'jury#add_comment'
	resources :users

	get '*path', to: "users#new"
end
