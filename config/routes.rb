Rails.application.routes.draw do
  get 'file/load'
  get 'file/view'
  get 'welcome/login'
  match "file/load" => "file#load", via: [:post]

  root 'welcome#login'
end
