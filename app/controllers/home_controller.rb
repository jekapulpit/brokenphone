class HomeController < ApplicationController
  def show
    @room = Room.first
  end
end
