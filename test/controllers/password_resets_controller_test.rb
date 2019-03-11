require 'test_helper'

class PasswordResetsControllerTest < ActionDispatch::IntegrationTest
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
  
  test "should get new" do
    get '/password_resets/new', params: {}, headers: @headers
    assert_response :success
  end

  test "should get edit" do
    get '/password_resets/edit', params: {}, headers: @headers
    assert_response :success
  end

end
