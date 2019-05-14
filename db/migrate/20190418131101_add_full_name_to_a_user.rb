# frozen_string_literal: true

class AddFullNameToAUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :full_name, :string
  end
end
