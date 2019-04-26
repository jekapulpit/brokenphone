class AddInviteStatus < ActiveRecord::Migration[5.2]
  def change
    add_column :invites, :accepted, :boolean, default: false
  end
end
