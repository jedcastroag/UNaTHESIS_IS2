Rails.application.routes.draw do
  get 'project/load_project'
	get 'welcome/login'
	root 'welcome#login'
end
