class Api::V4::RoomsController < ApplicationController
  def show
    room = Room.includes(:messages, :users).find(params[:id])
    render json: {messages: room.messages, users: room.users}
  end

  def index
    room = Room.first
    render json: {room: room}
  end
end
