class User < ApplicationRecord
	before_save { email.downcase! }
	before_save { institution.downcase! }
	before_save { country.downcase! }
	
	enum user_type_id: { admin: 1, student: 2, jury_tutor: 3 }

	validates :name, presence:true, length: { maximum: 60 }
	validates :password, presence:true, length: { minimum: 8, maximum: 30 }
	validates :user_type_id, presence:true
	after_create :send_mail
	
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence:true, length: { maximum: 254 },
	format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }

	# Relationships
	has_many :thesis_project_users
	has_many :thesis_projects, through: :thesis_project_users
	
	has_secure_password

	private

	def send_mail
		NewUserMailer.new_user(self).delivery_now
	end

end
