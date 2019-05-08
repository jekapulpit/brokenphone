class AddUnreadedNumberToRelation < ActiveRecord::Migration[5.2]
  def change
    add_column :room_relations, :unreaded_number, :integer, default: 0
  end
end
