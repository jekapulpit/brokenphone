# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :room_relations, dependent: :destroy
  has_many :users, through: :room_relations
  has_many :messages, as: :recipient, dependent: :destroy
  has_many :invites

  def with_last_message(user)
    last_message = messages.last.with_senders_name if messages.any?
    attributes
      .merge(
        last_message: last_message,
        type: 'room',
        unreaded_number: room_relations.find_by(user: user).unreaded_number
      )
  end

  def invite(user, message = 'hey! We need to talk!')
    Invite.create(content: message, room: self, user: user) unless user.in?(users) || invited?(user)
  end

  def invited?(user)
    invites.find_by(user: user)
  end
end
