class Invite < ApplicationRecord
  belongs_to :room
  belongs_to :user

  def accept
    unless accepted || user.in?(room.users)
      room.users << user
      self.update(accepted: true)
    end
  end

  def with_all_attributes
    attributes.merge({
                         type: 'invite',
                         recipient: user
                     })
  end
end
