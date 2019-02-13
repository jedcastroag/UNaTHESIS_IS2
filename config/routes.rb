Rails.application.routes.draw do
  get 'project/load_project'
	root 'welcome#login'
	get '/login', to: 'welcome#login'
	get '/signup', to: 'users#new'
end
