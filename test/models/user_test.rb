require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  def setup
  	@user = User.new(name: "Fabio", email: "f@test.com")
  end

  test "should be valid" do
  	assert @user.valid?
  end

  test "should be invalid user (name)" do
  	@user.name = "b" * 61
  	assert_not @user.valid?
  	@user.name = ""
  	assert_not @user.valid?
  	@user.name = "    "
  	assert_not @user.valid?
  end

  test "should be invalid user (email)" do
  	# Maximum length of email: 254
  	@user.email = "a" * (255 - 6) + "@t.com"
  	assert_not @user.valid?, "#{@user.email.inspect} should be invalid"
  	@user.email = "a" * (254 - 6) + "@t.com"
  	assert @user.valid?
  	@user.email = ""
  	assert_not @user.valid?
  	@user.email = "   "
  	assert_not @user.valid?
  end

  test "should be invalid user (email format)" do
  	invalid_email = %w[a a+.com a.com a@com a@hotmail a @hotmail.]

  	invalid_email.each do |email|
  		@user.email = email
  		assert_not @user.valid?, "#{email.inspect} should be invalid"
  	end
  end

  test "should be valid user (email format)" do
  	valid_email = %w[a@a.com fstxvxr@uniandes.edu.co bb_ggg@unal.edu.co]

  	valid_email.each do |email|
  		@user.email = email
  		assert @user.valid?, "#{email.inspect} should be valid"
  	end
  end

  test "email should be unique" do
  	duplicate_user = @user.dup
  	@user.save
  	assert_not duplicate_user.valid?

  	duplicate_user = @user.dup
  	duplicate_user.email = duplicate_user.email.upcase
  	@user.save
  	assert_not duplicate_user.valid?
  end

  test "email should be saved as lower-case" do
  	mixed_case_email = "dEvElOpEr@gGg.CoM"
  	@user.email = mixed_case_email
  	@user.save
  	assert_equal mixed_case_email.downcase, @user.reload.email
  end
end
