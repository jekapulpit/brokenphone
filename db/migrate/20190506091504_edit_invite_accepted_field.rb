# frozen_string_literal: true

class EditInviteAcceptedField < ActiveRecord::Migration[5.2]
  def change
    add_column :invites, :status, :integer, default: 0
    remove_column :invites, :accepted
  end
end
