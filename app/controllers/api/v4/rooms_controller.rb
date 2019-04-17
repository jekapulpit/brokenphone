class Api::V4::RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    room = Room.includes(:messages, :users).find(params[:id])
    render json: {room: room.with_last_message, messages: room.messages, users: room.users}
  end

  def index
    room = Room.first
    render json: {room: room.with_last_message}
  end

  def create
    room = Room.new
    room.attributes = room_params
    render json: { room: room, valid: room.save }
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
