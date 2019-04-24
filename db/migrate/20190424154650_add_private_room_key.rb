class AddPrivateRoomKey < ActiveRecord::Migration[5.2]
  def change
    add_column :rooms, :key, :string
  end
end
