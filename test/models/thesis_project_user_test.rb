require 'test_helper'

class ThesisProjectUserTest < ActiveSupport::TestCase
	def setup
		@user = User.find_by email: 'student@test.com'
		@user2 = User.find_by email: 'tutor@test.com'
		
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
	end
	
	def teardown
		@tutor_thesis_project_user.delete
		@author_thesis_project_user.delete
		# @thesis_project.delete
	end
	
	test "should be save a thesis project - user association" do
		assert @author_thesis_project_user.valid? && @tutor_thesis_project_user.valid?
	end
	
	test "should be throw an error when try create a duplicate association between a thesis and user with the same rol" do
		assert_raises ActiveRecord::RecordNotUnique do
			ThesisProjectUser.create user: @user2, 
			thesis_project: @thesis_project, thesis_project_roles_id: 2
		end
		
		assert_raises ActiveRecord::RecordNotUnique do
			ThesisProjectUser.create user: @user, 
			thesis_project: @thesis_project, thesis_project_roles_id: 1
		end
	end
	
	test "should allow a tutor/jury to be assigned more than one thesis project" do
		new_project = @thesis_project.dup
		new_project.save
		
		new_thesis_project_user = ThesisProjectUser.new user: @user2, 
		thesis_project: new_project, thesis_project_roles_id: 2

		assert new_thesis_project_user.save

		assert @user2.thesis_projects.size == 2

		new_thesis_project_user.delete
		new_project.delete
		assert_not new_thesis_project_user.persisted? || new_project.persisted?
	end
	
	test "should be able to save a new thesis project" do
		new_thesis = ThesisProject.create document: "/doc2", 
		approbation_state: true, activation_state: true,
		title: "Aplicaciones de la Ingeniería de Software en la vida campesina",
		description: "Here the description"
		
		thesis_project_user = ThesisProjectUser.create user: @user, 
		thesis_project: new_thesis, thesis_project_roles_id: "author"

		assert @user.thesis_projects.size == 2 && @user.thesis_projects.last.id == thesis_project_user.thesis_project_id

		thesis_project_user.delete
		new_thesis.delete
		assert_not new_thesis.persisted? || thesis_project_user.persisted?
	end
end