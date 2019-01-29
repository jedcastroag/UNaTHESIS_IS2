Rails.application.routes.draw do
  get 'file/load'
  get 'file/view'
	get 'welcome/login'
  root 'welcome#login'
end
