class PasswordResetsController < ApplicationController
  skip_before_action :verify_authenticity_token, :verify_authentication_request!

  def create
  end

  def new
  end

  def edit
  end
end
