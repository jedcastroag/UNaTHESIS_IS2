require 'test_helper'

class ChangePasswordControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = { email: "admin@test.com", password: "12345678" }
    post login_url, as: :json, params: { session: @admin.as_json }
    assert_response :success, "Problem with login"

    @header = { 'Authorization' => "Bearer #{ JSON.parse(response.body)['token'] }" }
  end

  test "should change the password" do
    credentials = {
      current_password: '12345678',
      new_password: '87654321',
      new_password_confirmation: '87654321'
    }
    get change_password_create_url, params: credentials, headers: @header
    assert_response :success

    @admin[:password] = credentials[:new_password]

    post login_url, as: :json, params: { session: @admin.as_json }
    assert_response :success, "Problem changing the password"

    assert_equal @admin[:password], credentials[:new_password]
  end

  test "should reject a change password request" do
    credentials = {
      current_password: '12345678',
      new_password: '8765432',
      new_password_confirmation: '87654321'
    }
    get change_password_create_url, params: credentials, headers: @header
    assert_response :bad_request
    assert_includes response.body, 'error'

    @admin[:password] = credentials[:new_password]

    post login_url, as: :json, params: { session: @admin.as_json }
    assert_response :unauthorized, "Problem changing the password"

    assert_equal @admin[:password], credentials[:new_password]

    credentials = {
      current_password: '1234678',
      new_password: '87654321',
      new_password_confirmation: '87654321'
    }
    get change_password_create_url, params: credentials, headers: @header
    assert_response :unauthorized
    assert_includes response.body, 'error'

    @admin[:password] = credentials[:new_password]

    post login_url, as: :json, params: { session: @admin.as_json }
    assert_response :unauthorized, "Problem changing the password"

    assert_equal @admin[:password], credentials[:new_password]
  end
end
