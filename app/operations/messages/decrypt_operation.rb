module Messages
  class DecryptOperation
    attr_reader :message, :room

    def initialize(message, room)
      @message = message
      @room = room
    end

    def execute; end
  end
end