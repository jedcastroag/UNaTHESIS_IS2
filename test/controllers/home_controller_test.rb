require 'test_helper'

class FileControllerTest < ActionDispatch::IntegrationTest
	def setup
		@user = { name: "Fabio", surname: "Tovar", email: "ft@test.edu.co", 
			password: "password", user_type_id: 1 }

		post users_path, as: :json, params: { user: @user.as_json }
		assert_response :success, "Problem with user creation"

		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success, "Problem with login"

		@token = JSON.parse(response.body)['token']
	end

	test 'should be validate an identified user' do
		get home_path, params: {}, headers: { 
			'Authorization' => "Bearer 666" 
		}

		body = JSON.parse(response.body)
		assert_response :unauthorized
	end

	test 'should be retrieve the home information' do
		get '/home', params: {}, headers: { 
			'Authorization' => "Bearer #{@token}" 
		}

		body = JSON.parse(response.body)
		assert_response :success
	end
end
