class AddSenderTypeToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :sender_type, :string
  end
end
