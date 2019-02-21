require 'test_helper'

class FileControllerTest < ActionDispatch::IntegrationTest
  test "should get load" do
    get file_load_url
    assert_response :success
  end

end
