class User < ApplicationRecord
	attr_accessor :remember_token, :activation_token, :reset_token
	
	before_save { email.downcase! }
	before_save { institution.downcase! }
	before_save { country.downcase! }
	
	enum user_type_id: { admin: 1, student: 2, jury_tutor: 3 }
	
	validates :name, presence:true, length: { maximum: 60 }
	validates :password, presence:true, length: { minimum: 8, maximum: 30 }
	validates :user_type_id, presence:true
	
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence:true, length: { maximum: 254 },
	format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
	
	# Relationships
	has_many :thesis_project_users
	has_many :thesis_projects, through: :thesis_project_users
	
	has_secure_password
	
	def change_password(new_password, new_password_confirmation)
		if new_password == new_password_confirmation
			update_attribute(:password_digest, BCrypt::Password.create(new_password))
		else
			raise "The password does not match"
		end
	end
end
