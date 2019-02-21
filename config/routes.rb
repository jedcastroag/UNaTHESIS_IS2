Rails.application.routes.draw do
	root 'users#new'

	get '/home', to: 'home#view'
	post '/login', to: 'sessions#create'
	post 'file/load_post', to: 'file#load_post'
	get 'file/download_project', to: 'file#download_pdf'
	get 'jury/projects', to: 'jury#search_project'
	resources :users

	get '*path', to: "users#new"
end
