# frozen_string_literal: true

class Api::V4::RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    room = Room.includes(:messages, :users).find(params[:id])
    messages = room.messages.any? ? room.messages.map(&:with_senders_name) : []
    render json: { room: room.with_last_message(current_user), messages: messages, users: room.users }
  end

  def index
    room = Room.first
    render json: { room: room.with_last_message(current_user) }
  end

  def create
    room = Room.new
    room.attributes = room_params
    room.users << current_user
    render json: { room: room, valid: room.save }
  end

  def destroy
    room = Room.find(params[:id])
    invite = current_user.invites.find_by(room: room)
    invite&.destroy
    relations = room.room_relations.find_by(user: current_user)
    render json: { destroyed: relations.destroy, user: current_user }
  end

  def read_all
    room_relation = RoomRelation.find_by(room_id: params[:id], user: current_user)
    room_relation&.update(unreaded_number: 0)
    render json: { readed: true }
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
