class User < ApplicationRecord
	before_save { email.downcase! }
	validates :name, presence:true, length: { maximum: 60 }
	validates :password, presence:true, length: { minimum: 8, maximum: 30 }
	validates :user_type_id, presence:true
	
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence:true, length: { maximum: 254 },
	format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }

	# Relationships
	has_and_belongs_to_many :thesis_projects
	
	has_secure_password
end
