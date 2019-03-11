require 'test_helper'

class FileControllerTest < ActionDispatch::IntegrationTest
	def setup
		@student = { email: "student@test.com", password: "12345678" }

		post login_url, as: :json, params: { session: @student.as_json }
		assert_response :success, "Problem with login"

		@header = { 'Authorization' => "Bearer #{ JSON.parse(response.body)['token'] }" }
	end

	test "a student should be able to upload a project" do
		# post file_load_post_path, as: :json
	end

	test "a tutor/jury should not be able to upload a project" do

	end
end
