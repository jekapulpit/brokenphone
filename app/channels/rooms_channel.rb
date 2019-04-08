class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @line = Room.first
    stream_for @line
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data)
    RoomsChannel.broadcast_to(@line, data)
  end

  def send_message(data)
    RoomsChannel.broadcast_to(@line, data)
  end
end
