require 'test_helper'
require 'json'

class SessionsControllerTest < ActionDispatch::IntegrationTest
	def setup
		@user = { name: "Fabio", surname:"Tovar", email: "ft@test.edu.co", password: "password" }
	end
	test "should get login page" do
		#get login_url
		#assert_response :success
	end

	test "should authenticate successfully" do
		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success, "User creation"

		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success
	end

	test "should not authenticate" do
		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success, "User creation"

		@user[:password].upcase!
		
		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :unauthorized
	end

	test "should validate UNAL emails with ldap" do
		#post users_path, as: :json, params: { user: @user.as_json }
		#assert_response :unprocessable_entity
	end

	test "JSON Web token would be well-formed" do
		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success, "User creation"

		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success

		assert_includes JSON.parse(response.body), 'token'
	end

end
