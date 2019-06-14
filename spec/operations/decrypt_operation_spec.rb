# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Messages::DecryptOperation do
  let(:plain) { 'plain text' }
  let(:safe_room) { FactoryGirl.create(:safe_room) }
  let(:encrypted) { Messages::EncryptOperation.new(plain, safe_room).execute }

  it 'should decrypt encrypted text plain text' do
    expect(Messages::DecryptOperation.new(encrypted, safe_room).execute).to eq plain
  end
end
