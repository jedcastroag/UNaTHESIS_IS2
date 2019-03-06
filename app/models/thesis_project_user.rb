class ThesisProjectUser < ApplicationRecord
    belongs_to :thesis_project
    belongs_to :user
end
