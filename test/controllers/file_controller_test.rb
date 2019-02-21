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

	test 'should be block an attempt to identified user to download a project' do
		get '/file/download_project', params: {}, headers: { 
			'Authorization' => "Bearer 666" 
		}

		body = JSON.parse(response.body)
		assert_response :unauthorized
	end
end
