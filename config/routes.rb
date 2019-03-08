Rails.application.routes.draw do
	root 'users#new'

	get '/home', to: 'home#view'
	get 'file/download_project', to: 'file#download_pdf'
	get 'jury_projects', to: 'jury#search_projects'
	get 'jury_comment', to: 'jury#get_comment'
	get 'jury_questions', to: 'jury#get_questions'
	post '/login', to: 'sessions#create'
	post 'file/load_post', to: 'file#load_post'
	post 'jury_comment', to: 'jury#add_comment'
	post 'jury_questions', to: 'jury#add_questions'
	resources :users

	get '*path', to: "users#new"
end
