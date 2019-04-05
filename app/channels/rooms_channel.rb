class RoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'rooms_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    ActionCable.server.broadcast 'rooms_channel', data['message']
  end
end
