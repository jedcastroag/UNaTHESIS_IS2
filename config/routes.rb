Rails.application.routes.draw do
	root 'users#new'

	get '/home', to: 'home#view'
	post '/login', to: 'sessions#create'
	post 'file/load_post', to: 'file#load_post'
	get '/users/:id', to: 'users#find'
	get '/getUserInfo', to: 'users#getActualUserInfo'
	get '/project/find/:userId', to: 'project#getProjectForUser'
	get 'file/download_project', to: 'file#download_pdf'
	get 'admin/fetch_users_data', to: 'admin#fetch_users_data'
	get 'admin/fetch_user_data', to: 'admin#fetch_user_data'
	match 'admin/delete_user', to: 'admin#delete_user', via: [:post]
	match 'admin/add_user', to: 'admin#add_user', via: [:post]

	resources :users
	
	get '*path', to: "users#new"
end
