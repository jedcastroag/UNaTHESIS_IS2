require 'test_helper'

class FileControllerTest < ActionDispatch::IntegrationTest
	def setup
		@user = { email: "student@test.com", password: "12345678" }

		post login_url, as: :json, params: { session: @user.as_json }
		assert_response :success, "Problem with login"

		@token = JSON.parse(response.body)['token']
	end

	test 'should be block an attempt to identified user to download a project' do
		get student_download_project_path, params: {}, headers: { 
			'Authorization' => "Bearer 666"
		}

		body = JSON.parse(response.body)
		assert_response :unauthorized
	end
end
