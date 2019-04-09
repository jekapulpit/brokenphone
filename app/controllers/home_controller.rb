class HomeController < ApplicationController
  def show
    @rooms = current_user.rooms
  end
end
