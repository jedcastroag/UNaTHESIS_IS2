Rails.application.routes.draw do
	root 'sessions#new'
	
	get '/login', to: 'sessions#new'	
	get '/signup', to: 'users#new'

	post '/login', to: 'sessions#create'

	resources :users
end
