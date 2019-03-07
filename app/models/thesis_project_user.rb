class ThesisProjectUser < ApplicationRecord
    enum thesis_project_rols_id: { author: 1, tutor: 2, jury: 3 }
    belongs_to :thesis_project
    belongs_to :user
end
