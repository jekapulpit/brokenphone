class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id', polymorphic: true
  belongs_to :recipient, class_name: 'Room', foreign_key: 'recipient_id', polymorphic: true

  def with_senders_name
    attributes
        .merge(
            senders_name: sender.full_name,
            sended: created_at.strftime("%d/%m/%Y %H:%M")
        )
  end
end
