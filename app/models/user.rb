class User < ApplicationRecord
	attr_accessor :reset_token
	
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
			update_attributes({
				password: new_password, 
				password_confirmation: new_password_confirmation
			})
		else
			raise "The password does not match"
		end
	end

	def validate_reset_token(token)
		BCrypt::Password.new(self.reset_digest).is_password?(token)
	end
	
	def create_reset_digest
		self.reset_token = User.new_token
		update_attribute :reset_digest, User.digest(reset_token)
		update_attribute :reset_sent_at, Time.zone.now
	end
	
	def send_password_reset_email
		UserMailer.password_reset(self).deliver_now
	end

	def password_reset_expired?
		reset_sent_at < 2.hours.ago
	end

	class << self
		def new_token
			SecureRandom.urlsafe_base64
		end
		
		def digest(string)
			cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : 
			BCrypt::Engine.cost
			BCrypt::Password.create(string, cost: cost)
		end
	end
end
