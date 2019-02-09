Rails.application.routes.draw do
    devise_for :users
    resources :users

    scope module: 'admin' do
        post '/new_process', to: "process#create"
    end

    get 'welcome/login'
    root 'welcome#login'
end
