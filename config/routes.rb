Rails.application.routes.draw do
	root 'sessions#new'
	
	get '/login', to: 'sessions#new'	
	get '/signup', to: 'users#new'

	post '/login', to: 'sessions#create'

	resources :users

	get 'file/load'
	get 'file/view'
	match "file/load_post" => "file#load_post", via: [:post]
end
