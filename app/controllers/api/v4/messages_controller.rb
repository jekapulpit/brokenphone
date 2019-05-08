class Api::V4::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    message = Message.new(message_params)
    render json: {
        valid: message.save,
        message: message.with_senders_name
    }
  end

  def message_params
    params.require(:message).permit(:content, :sender_id, :recipient_id, :recipient_type, :sender_type)
  end
end
