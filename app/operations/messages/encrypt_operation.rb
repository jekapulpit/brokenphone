module Messages
  class EncryptOperation
    attr_reader :message, :room, :cipher

    def initialize(message, room)
      @message = 'privet'
      @room = room
      @cipher = OpenSSL::Cipher::AES.new(128, :CBC)
    end

    def execute
      cipher.encrypt
      cipher.key = get_or_create_key
      encrypted = cipher.update(message) + cipher.final
    end

    private

    def get_or_create_key
      room.update(secret_key: Base64.encode64(cipher.random_key)) unless room.secret_key
      room.secret_key
    end
  end
end