class Api::V4::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    message = Message.new(message_params)
    message.recipient = Room.find(params[:recipient_id])
    message.sender = current_user
    render json: {
        valid: message.save,
        message: message.with_senders_name
    }
  end

  def message_params
    params.require(:message).permit(:content, :sender_id)
  end
end
