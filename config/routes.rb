Rails.application.routes.draw do
  get 'file/load'
  get 'file/view'
	get '/login', to: 'welcome#login'
  get '/signup', to: 'users#new'
  get '/home_administration', to: 'administrator#index'
  get '/users_administration', to: 'administrator#users'
	match "file/load_post" => "file#load_post", via: [:post]

  root 'welcome#login'
end
