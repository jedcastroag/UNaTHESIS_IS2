Rails.application.routes.draw do
<<<<<<< HEAD
  get 'file/load'
  get 'file/view'
	get '/login', to: 'welcome#login'
  get '/signup', to: 'users#new'
  get '/home_administration', to: 'administrator#index'
  get '/users_administration', to: 'administrator#users'
	match "file/load_post" => "file#load_post", via: [:post]

  root 'welcome#login'
=======
	root 'users#new'

	get '/home', to: 'home#view'
	post '/login', to: 'sessions#create'
	post 'file/load_post', to: 'file#load_post'
	get 'file/download_project', to: 'file#download_pdf'
	
	resources :users
	
	get '*path', to: "users#new"
>>>>>>> c83b1b7f0243efdfc1d7ef58334bdede64111252
end
