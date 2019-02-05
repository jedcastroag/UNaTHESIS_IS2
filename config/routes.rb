Rails.application.routes.draw do
	root 'welcome#login'
	get '/login', to: 'welcome#login'
	get '/signup', to: 'users#new'
end
