class Question < ApplicationRecord
    validates :content, presence:true
	belongs_to :thesis_project
end
