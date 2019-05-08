class Api::V4::RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :read_all, only: :show

  def show
    room = Room.includes(:messages, :users).find(params[:id])
    render json: {room: room.with_last_message(current_user), messages: room.messages.map(&:with_senders_name), users: room.users}
  end

  def index
    room = Room.first
    render json: {room: room.with_last_message(current_user)}
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
    invite.destroy if invite
    relations = room.room_relations.find_by(user: current_user)
    render json: { destroyed: relations.destroy, user: current_user }
  end

  def increment_unreaded
    room_relation = RoomRelation.find_by(room_id: params[:id], user: current_user)
    render json: { incremented: room_relation.update(unreaded_number: room_relation.unreaded_number + 1) }
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end

  def read_all
    RoomRelation.find_by(room_id: params[:id], user: current_user).update(unreaded_number: 0)
  end
end
