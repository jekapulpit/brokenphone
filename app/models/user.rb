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

  searchkick word_start: [:full_name, :email]

  def invited_to?(room)
    Invite.find_by(room: room, user: self)
  end

  scope :search_by_email, -> (email) { search(email, fields: [{email: :exact}, :full_name]) }

end
