class Api::V4::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    if message.save
      ActionCable.server.broadcast 'rooms_channel', message
      head :ok
    end
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
