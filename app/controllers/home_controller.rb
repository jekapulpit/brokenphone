class HomeController < ApplicationController
  def show
    @rooms = Room.all.map(&:with_last_message)
  end
end
