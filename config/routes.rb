Rails.application.routes.draw do
    root 'welcome#login'

    scope module: 'users' do
        scope module: 'admin' do
            resources :process
        end
        scope module: 'jury' do
            resources :jury
        end
    end



    get 'welcome/login'

end
