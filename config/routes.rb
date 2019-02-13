Rails.application.routes.draw do
    root 'welcome#login'
    
    scope module: 'admin' do
        resources :process
    end

    get 'welcome/login'

end
