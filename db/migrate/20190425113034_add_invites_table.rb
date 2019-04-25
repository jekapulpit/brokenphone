class AddInvitesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :invites do |t|
      t.string :content
      t.references :user, foreign_key: true
      t.references :room, foreign_key: true
      t.timestamps
    end
  end
end
