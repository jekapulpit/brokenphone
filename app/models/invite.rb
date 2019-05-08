class Invite < ApplicationRecord
  belongs_to :room
  belongs_to :user

  enum status: [ :sended, :accepted, :rejected ]

  def accept
    unless status != 'sended' || user.in?(room.users)
      room.users << user
      self.update(status: 'accepted')
    end
  end

  def reject
    unless status != 'sended' || user.in?(room.users)
      self.update(status: 'rejected')
    end
  end

  def with_all_attributes
    attributes.merge({
                         type: 'invite',
                         recipient: user
                     })
  end
end
