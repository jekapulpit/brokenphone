class HomeController < ApplicationController
  def show
    @rooms = current_user.rooms.map(&:with_last_message)
    @invites = current_user.invites.select{ |invite| !invite.accepted? }.map(&:with_type)
  end
end
