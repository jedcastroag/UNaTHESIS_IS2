Rails.application.routes.draw do
  get 'file/load'
  get 'file/view'
  get 'welcome/login'
  match "file/load_post" => "file#load_post", via: [:post]

  root 'welcome#login'
end
