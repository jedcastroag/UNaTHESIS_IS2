Rails.application.routes.draw do
	root 'users#new'

	get '/home', to: 'home#view'
	post '/login', to: 'sessions#create'
	post 'file/load_post', to: 'file#load_post'
	
	resources :users
	
	get '*path', to: "users#new"
end
