require 'test_helper'

class PasswordResetsTest < ActionDispatch::IntegrationTest
  def setup
    ActionMailer::Base.deliveries.clear
    @user = User.find_by email: 'student@test.com'
  end
  
  test "password resets" do
    get new_password_reset_path
    assert_template 'password_resets/new'
    
    # Invalid email detection
    post password_resets_path, params: { email: 'invalidemail@test.com' }
    assert_includes response.body, 'error'
    
    # Valid email request
    post password_resets_path, params: { email: 'student@test.com' }
    assert_response :success
    assert response.body.empty?

    assert_not_equal @user.reset_digest, @user.reload.reset_digest
    assert_equal ActionMailer::Base.deliveries.size, 1

    user = assigns :user

    # Invalid email
    get edit_password_reset_path user.reset_token, email: ""
    assert_includes response.body, 'error'
    assert_response :bad_request
    
    # Valid email, invalid token
    get edit_password_reset_path 'token', email: user.email
    assert_includes response.body, 'error'
    assert_response :bad_request
    
    # Valid email, valid token
    get edit_password_reset_path user.reset_token, email: user.email
    assert_response :success
    
    # Invalid password and confirmation
    patch password_reset_path(user.reset_token), params: { email: user.email, 
      user: { 
        password: "foobaz",
        password_confirmation: "barquux" 
      } 
    }
    assert_response :bad_request
    
    # Empty password
    patch password_reset_path(user.reset_token), params: { email: user.email,
      user: { 
        password: "",
        password_confirmation: "" 
      } 
    }
    assert_response :bad_request
    
    # Valid password & confirmation
    patch password_reset_path(user.reset_token), params: { email: user.email,
      user: {
        password: "87654321",
		    password_confirmation: "87654321"
      } 
    }
    assert_response :success

    @user = { email: "student@test.com", password: "12345678" }
    post login_url, as: :json, params: { session: @user.as_json }
    assert_response :unauthorized

    @user = { email: "student@test.com", password: "87654321" }
    post login_url, as: :json, params: { session: @user.as_json }
    assert_response :success

    assert 1 == 1
  end
end
