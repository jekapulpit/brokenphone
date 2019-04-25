class User < ApplicationRecord
  has_many :room_relations
  has_many :messages
  has_many :invites
  has_many :rooms, through: :room_relations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable

  def invited_to?(room)
    Invite.find_by(room: room, user: self)
  end
end
