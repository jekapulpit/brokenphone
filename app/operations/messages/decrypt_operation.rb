module Messages
  class DecryptOperation
    attr_reader :encrypted, :room, :decipher

    def initialize(encrypted, room)
      @encrypted = encrypted
      @room = room
      @decipher = OpenSSL::Cipher::AES.new(128, :CBC)
    end

    def execute
      decipher.decrypt
      decipher.key = room.secret_key
      plain = decipher.update(encrypted) + decipher.final
      puts "---plain: #{plain}"
    end
  end
end