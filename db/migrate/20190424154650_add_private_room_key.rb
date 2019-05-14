# frozen_string_literal: true

class AddPrivateRoomKey < ActiveRecord::Migration[5.2]
  def change
    add_column :rooms, :secret_key, :string
  end
end
