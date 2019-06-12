# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:room) { FactoryGirl.create(:filled_room, users_count: 1) }
  let(:creator) { room.users.first }
  let(:outsider) { FactoryGirl.create(:user) }

  describe 'user#with_invited' do
    context 'when inside the room' do
      it 'should be with accepted field with true value' do
        expect(creator.with_invited(room)[:accepted]).to eq true
      end
    end

    context 'when not inside the room' do
      it 'should be with accepted field with false value' do
        expect(outsider.with_invited(room)[:accepted]).to eq false
      end
    end
  end

  describe 'user#invited_to?' do
    context 'when not invited or creator' do
      it 'outsider should be with invited field with nil value' do
        expect(outsider.invited_to?(room)).to eq nil
      end

      it 'creator should be with invited field with nil value' do
        expect(outsider.invited_to?(room)).to eq nil
      end
    end

    context 'when invited' do
      before { room.invite outsider }
      it 'should return relation' do
        expect(outsider.invited_to?(room)).not_to eq nil
      end
    end
  end
end
