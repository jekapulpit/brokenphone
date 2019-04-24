class HomeController < ApplicationController
  def show
    @rooms = Room.all.map(&:with_last_message)
    enc = Messages::EncryptOperation.new('privet', Room.last).execute
    Messages::DecryptOperation.new(enc, Room.last).execute
  end
end
