Rails.application.routes.draw do
	get 'welcome/login'
	root 'welcome#login'
end
