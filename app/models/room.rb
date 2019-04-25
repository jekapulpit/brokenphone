class Room < ApplicationRecord
  has_many :room_relations, dependent: :destroy
  has_many :users, through: :room_relations
  has_many :messages, as: :recipient, dependent: :destroy

  def with_last_message
    attributes
        .merge(last_message: messages.last)
  end
end
