class Question < ApplicationRecord
    validates :question, presence:true
	belongs_to :thesis_project
end
