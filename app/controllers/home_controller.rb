class HomeController < ApplicationController
  def show
    @rooms = current_user.rooms.map{ |room| room.with_last_message(current_user)}
    @invites = current_user.invites.select{ |invite| invite.status == 'sended' }.map(&:with_all_attributes)
  end
end
