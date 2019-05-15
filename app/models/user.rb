class User < ApplicationRecord
  has_many :room_relations
  has_many :messages
  has_many :invites
  has_many :rooms, through: :room_relations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  searchkick word_start: [:full_name, :email]

  def invited_to?(room)
    Invite.find_by(room: room, user: self)
  end

  def with_invited(room)
    attributes.merge({
                         invited: invited_to?(room),
                         accepted: self.in?(room.users)
                     })
  end

  scope :search_by_email, -> (email) { search(email, fields: [{email: :exact}, :full_name]) }
  scope :search_for_invite, -> (request, room_id) { search_by_email(request).map{|user| user.with_invited(Room.find(room_id))} }

end
