require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
	def setup
		@base_title = " | Unthesis"
	end

	test "should get login as root page" do
		get welcome_login_url
		assert_response :success
		assert_select "title", "Login#{@base_title}"
	end
end
