Rails.application.routes.draw do
  devise_for :users
	get 'welcome/login'
	root 'welcome#login'
end
