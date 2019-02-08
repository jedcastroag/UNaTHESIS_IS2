require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

	def setup
		@user = { name: "Tester", email: "f@test.com", 
			password: "mypassword", password_confirmation: "mypassword" }
	end

	test "should create new user" do
		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success
	end

	test "should not create duplicate users" do
		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success
		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :unprocessable_entity
	end

	test "should not create users with missing information" do
		invalid_user = @user.dup
		invalid_user[:password] = ""
		post users_path, as: :json, params: { user: invalid_user.as_json }
		assert_response :unprocessable_entity
		
		invalid_user = @user.dup
		invalid_user[:name] = ""
		post users_path, as: :json, params: { user: invalid_user.as_json }
		assert_response :unprocessable_entity

		invalid_user = @user.dup
		invalid_user[:email] = ""
		post users_path, as: :json, params: { user: invalid_user.as_json }
		assert_response :unprocessable_entity
	end

	test "should get new" do
		#get login_path
		#assert_response :success
	end
end
