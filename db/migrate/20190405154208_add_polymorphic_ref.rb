# frozen_string_literal: true

class AddPolymorphicRef < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :recipient_type, :string
  end
end
