require 'test_helper'

class FileControllerTest < ActionDispatch::IntegrationTest
	def setup
		@user = { name: "Fabio", surname:"Tovar", email: "ft@test.edu.co", password: "password" }

		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success, "Problem with user creation"

		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success, "Problem with login"

		@token = JSON.parse(response.body)['token']
	end

	test 'should be validate an identified user' do

	end

	test 'should be retrieve the home information' do 
		@request.headers.merge!({'Authorization' => "Bearer #{@token}"})

		get home_path
		
		body = JSON.parse(response.body)
		puts @token
		assert_response :success
	end
end
