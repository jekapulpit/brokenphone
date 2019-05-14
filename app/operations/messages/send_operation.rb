# frozen_string_literal: true

module Messages
  class SendOperation
    attr_reader :message, :room

    def initialize(message, sender_id, room)
      @message = Message.new
      @message.content = message
      @message.sender_id = sender_id
      @message.recipient = room
      @room = room
    end

    def execute
      message.save
    end
  end
end
