class Room < ApplicationRecord
  has_many :room_relations
  has_many :users, through: :room_relations
  has_many :messages, as: :recipient
end
