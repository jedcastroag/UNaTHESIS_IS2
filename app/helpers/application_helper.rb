module ApplicationHelper
	def full_title(page_title = '')
		baste_title = "Unthesis"
		return baste_title if page_title.empty?
		return page_title + " | " + baste_title 
	end
end
