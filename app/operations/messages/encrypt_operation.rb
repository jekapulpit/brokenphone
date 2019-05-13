module Messages
  class EncryptOperation
    attr_reader :message, :room, :cipher

    def initialize(message, room)
      @message = message
      @room = room
      @cipher = OpenSSL::Cipher::AES.new(128, :CBC)
    end

    def execute
      cipher.encrypt
      cipher.key = get_or_create_key
      encrypted = cipher.update(message) + cipher.final
      encrypted.bytes.join(' ')
    end

    private

    def get_or_create_key
      if room.secret_key
        rand_key = room.secret_key.split.map{|byte| byte.to_i.chr}.join
      else
        rand_key = cipher.random_key
        room.update(secret_key: rand_key.bytes.join(' '))
      end
      rand_key
    end
  end
end