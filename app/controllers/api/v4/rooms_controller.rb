class RoomsController < ApplicationController
  def show
    messages = Message.all
    render json: {messages: messages}
  end
end
