class Api::V4::RoomsController < ApplicationController
  def index
    messages = Message.all
    render json: {messages: messages}
  end
end
