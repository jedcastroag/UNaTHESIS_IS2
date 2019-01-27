Rails.application.routes.draw do
  get 'project/load_project'
   root 'welcome#index'
end
