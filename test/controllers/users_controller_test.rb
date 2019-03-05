require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
	def setup
		@user = { name: "Tester", surname: "Testercito", email: "f@test.com", dni: "12345678",
			password: "mypassword", password_confirmation: "mypassword", user_type_id: 3 }
		
		post login_path, as: :json, params: { session: { email: 'admin@test.com', password: "12345678" } }
		assert_response :success
		@header = { 'Authorization' => "Bearer #{ JSON.parse(response.body)['token'] }" }
	end

	test "should create new user" do
		post users_path, as: :json, params: { user: @user.as_json }, headers: @header
		assert_response :success
	end

	test "should not create duplicate users" do
		post users_path, as: :json, params: { user: @user.as_json }, headers: @header
		assert_response :success
		post users_path, as: :json, params: { user: @user.as_json }, headers: @header
		assert_response :unprocessable_entity
	end

	test "should not create users with missing information" do
		invalid_user = @user.dup
		invalid_user[:password] = ""
		post users_path, as: :json, params: { user: invalid_user.as_json }, headers: @header
		assert_response :unprocessable_entity
		invalid_user = @user.dup
		invalid_user[:name] = ""
		post users_path, as: :json, params: { user: invalid_user.as_json }, headers: @header
		assert_response :unprocessable_entity

		invalid_user = @user.dup
		invalid_user[:email] = ""
		post users_path, as: :json, params: { user: invalid_user.as_json }, headers: @header
		assert_response :unprocessable_entity
	end

	test "should get new" do
	end
end
