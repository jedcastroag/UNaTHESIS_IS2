require 'test_helper'

class ThesisProjectTest < ActiveSupport::TestCase
  def setup
    @user = User.find_by email: 'student@test.com'
    @user2 = User.find_by email: 'tutor@test.com'
    @user3 = User.find_by email: 'jury@test.com'
		
		@thesis_project = ThesisProject.create document: "/doc", 
		approbation_state: true, activation_state: true, 
		title: "Aplicaciones de la Ingeniería de Software en la vida campesina",
		description: "Here the description"
		
		# Author rol
		@author_thesis_project_user = ThesisProjectUser.create user: @user, 
		thesis_project: @thesis_project, thesis_project_roles_id: 1
		
		# Tutor rol
		@tutor_thesis_project_user = ThesisProjectUser.create user: @user2, 
    thesis_project: @thesis_project, thesis_project_roles_id: 2

    @tutor2_thesis_project_user = ThesisProjectUser.create user: @user3, 
    thesis_project: @thesis_project, thesis_project_roles_id: 2
  end

  def teardown
    @tutor_thesis_project_user.destroy
    @tutor2_thesis_project_user.destroy
    @author_thesis_project_user.destroy
    @thesis_project.delete
  end

  test "should retrieve the users related with the current thesis project" do
    users = @thesis_project.related_users(@user).as_json
    assert_equal users.first["name"], @user2.name
    assert_equal users.last["name"], @user3.name    
  end
end
