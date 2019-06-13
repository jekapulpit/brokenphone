# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Messages::EncryptOperation do
  let(:plain) { 'plain text' }
  let(:room) { FactoryGirl.create(:room) }
  let(:safe_room) { FactoryGirl.create(:safe_room) }
  let(:key) { safe_room.secret_key }

  context 'when room has not key' do
    it 'key should be nil' do
      expect(room.secret_key).to be_nil
    end

    it 'key should be generated' do
      Messages::EncryptOperation.new(plain, room).execute
      expect(room.secret_key.split.length).to eq 16
    end
  end

  context 'when room has a key' do
    it 'key should be 16 bytes when splitted' do
      expect(safe_room.secret_key.split.length).to eq 16
    end

    it 'key should not be generated' do
      Messages::EncryptOperation.new(plain, room).execute
      expect(safe_room.secret_key).to eq key
    end
  end
end
