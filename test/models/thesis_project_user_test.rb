require 'test_helper'

class ThesisProjectUserTest < ActiveSupport::TestCase
	def setup
		@user = User.new name: "Fabio", surname: "Tovar", email: "f@test.com", 
  		password: "mypassword", password_confirmation: "mypassword", user_type_id: 2
  		@user2 = User.new name: "Fabio2", surname: "Tovar", email: "f2@test.com", 
  		password: "mypassword", password_confirmation: "mypassword", user_type_id: 2
  		@thesis_project = ThesisProject.create document: "/doc", 
  		approbation_state: true, activation_state: true
  		
  		@user.thesis_projects << @thesis_project
		@user2.thesis_projects << @thesis_project
	end

	test "should be save a thesis project - user association" do
		assert @user.save && @user2.save
	end

	test "should be throw an error when try enter a duplicate record" do
		@user.thesis_projects << @thesis_project
		@user2.thesis_projects << @thesis_project

		assert_raises ActiveRecord::RecordNotUnique do
			@user.save
		end

		assert_raises ActiveRecord::RecordNotUnique do
			@user2.save
		end
	end

	test "should be able to save a new thesis project" do
		new_thesis = ThesisProject.create document: "/doc2", 
  		approbation_state: true, activation_state: true
  		@user.thesis_projects << new_thesis
  		@user2.thesis_projects << new_thesis

  		assert @user.save && @user2.save
	end
end