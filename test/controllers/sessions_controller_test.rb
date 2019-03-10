require 'test_helper'
require 'json'

class SessionsControllerTest < ActionDispatch::IntegrationTest
	def setup
		@user = { email: "student@test.com", password: "12345678" }
	end

	test "should authenticate successfully" do
		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success
	end

	test "should not authenticate" do
		@user[:password] = "bad_password):"
		
		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :unauthorized
	end

	test "should validate UNAL emails with ldap" do
		
	end

	test "JSON Web token would be well-formed" do
		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success

		assert_includes JSON.parse(response.body), 'token'
	end
end
