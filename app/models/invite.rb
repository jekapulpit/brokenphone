class Invite < ApplicationRecord
  belongs_to :room
  belongs_to :user

  def accept
    unless accepted
      room.users << user
      self.update(accepted: true)
    end
  end
end
