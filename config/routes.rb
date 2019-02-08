Rails.application.routes.draw do
    devise_for :users
    resources :users

    scope module: 'admin' do
    	resources :process
	end

    get 'welcome/login'
    root 'welcome#login'
end
