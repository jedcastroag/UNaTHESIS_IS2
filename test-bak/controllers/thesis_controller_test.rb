require 'test_helper'

class ThesisControllerTest < ActionDispatch::IntegrationTest
  test "should get load_thesis" do
    get thesis_load_thesis_url
    assert_response :success
  end

end
