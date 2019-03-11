require 'test_helper'

class ChangePasswordControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get change_password_create_url
    assert_response :success
  end

  test "should get new" do
    get change_password_new_url
    assert_response :success
  end

end
