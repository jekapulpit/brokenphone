class HomeController < ApplicationController
  def show
    #e = Messages::EncryptOperation.new('', room.first).execute
    #Messages::DecryptOperation.new(e, room.first).execute
    @rooms = current_user.rooms.map{ |room| room.with_last_message(current_user)}
    @invites = current_user.invites.select{ |invite| invite.status == 'sended' }.map(&:with_all_attributes)
  end
end
