class Api::V4::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    message = Message.new(message_params_secure)
    puts message.inspect
    increment_unreaded(message.recipient)
    render json: {
        valid: message.save,
        message: message.with_senders_name
    }
  end

  def destroy
    message = Message.find(params[:id])
    destroyed = message.destroy
    new_last_message = message.recipient.messages.last
    render json: { destroyed: destroyed, message: message, new_last_message: new_last_message.with_senders_name}
  end

  private

  def increment_unreaded(room)
    room_relations = room.room_relations
    room_relations.update_all('unreaded_number = unreaded_number + 1') if room_relations.any?
  end

  def message_params
    params.require(:message).permit(:content, :sender_id, :recipient_id, :recipient_type, :sender_type)
  end

  def message_params_secure
    parameters = message_params
    parameters[:content] = Messages::EncryptOperation.new(parameters[:content], Room.find(parameters[:recipient_id])).execute
    parameters
  end
end
