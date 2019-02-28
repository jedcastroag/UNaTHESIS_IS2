Rails.application.routes.draw do
	root 'users#new'

	get '/home', to: 'home#view'
	get '/users/:id', to: 'users#find'
	get '/project/find/:userId', to: 'project#getProjectForUser'
	get '/student/download_project', to: 'student#download_pdf'

	post '/login', to: 'sessions#create'
	post '/file/load_post', to: 'file#load_post'
	post '/users', to: 'users#create'
	
	resources :users
	
	get '*path', to: "users#new"
end
