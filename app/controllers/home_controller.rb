class HomeController < ApplicationController
  def show
    @rooms = current_user.rooms.map(&:with_last_message)
  end
end
