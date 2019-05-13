class Api::V4::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    message = Message.new(message_params)
    increment_unreaded(message.recipient)
    render json: {
        valid: message.save,
        message: message.with_senders_name
    }
  end

  private

  def increment_unreaded(room)
    room_relations = room.room_relations
    room_relations.update_all('unreaded_number = unreaded_number + 1') if room_relations.any?
  end

  def message_params
    params.require(:message).permit(:content, :sender_id, :recipient_id, :recipient_type, :sender_type)
  end
end
