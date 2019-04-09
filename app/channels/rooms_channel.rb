class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @room = Room.first
    stream_for @room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data); end

  def send_message(data)
    RoomsChannel.broadcast_to(@room, data)
  end
end
