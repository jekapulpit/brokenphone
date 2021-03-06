# frozen_string_literal: true

class Invite < ApplicationRecord
  belongs_to :room
  belongs_to :user

  enum status: %i[sended accepted rejected]

  def accept
    unless status != 'sended' || user.in?(room.users)
      room.users << user
      update(status: 'accepted')
    end
  end

  def reject
    update(status: 'rejected') unless status != 'sended' || user.in?(room.users)
  end

  def with_all_attributes
    attributes.merge(
      type: 'invite',
      recipient: user
    )
  end
end
