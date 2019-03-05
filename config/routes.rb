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
  get 'admin/fetch_projects', to: 'admin#fetch_projects'
  get 'admin/fetch_user_data', to: 'admin#fetch_user_data'
  get 'admin/fetch_roles_project', to: 'admin#fetch_roles_project'
  get 'admin/fetch_roles', to: 'admin#fetch_roles'
  match 'admin/delete_user', to: 'admin#delete_user', via: [:post]
  match 'admin/delete_project', to: 'admin#delete_project', via: [:post]
  match 'admin/add_user', to: 'admin#add_user', via: [:post]
  match 'admin/create_project', to: 'admin#create_project', via: [:post]
  match 'admin/asign_roles', to: 'admin#asign_roles', via: [:post]

  resources :users
  get '*path', to: 'users#new'
end
