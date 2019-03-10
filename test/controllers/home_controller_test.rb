require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
	def setup
		@student = { email: "student@test.com", password: "12345678" }
		@admin = { email: "admin@test.com", password: "12345678" }
		@jury = { email: "jury@test.com", password: "12345678" }
		@tutor = { email: "tutor@test.com", password: "12345678" }
		authenticate @student
	end

	def authenticate (user)
		post login_url, as: :json, params: { session: user.as_json }
		assert_response :success, "Problem with login"
		@headers = { 'Authorization' => "Bearer #{ JSON.parse(response.body)['token'] }" }
	end

	test 'should be detect an unidentified user' do
		get home_path, params: {}, headers: { 
			'Authorization' => "Bearer 666" 
		}

		body = JSON.parse(response.body)
		assert_response :unauthorized
	end

	def validate_response(key_to_validate)
		get home_path, params: {}, headers: @headers
		assert_response :success
		assert_includes JSON.parse(response.body), key_to_validate
	end

	test 'should be retrieve the home information for each rol' do
		validate_response 'thesis'

		authenticate @admin
		validate_response 'user_type_id'

		authenticate @jury
		validate_response 'name'

		authenticate @tutor
		validate_response 'surname'
	end
end
