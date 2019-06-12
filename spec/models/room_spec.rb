# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:filled_room) {  FactoryGirl.create(:safe_room)  }
  let(:insider) { filled_room.users.first }
  let(:outsider) { FactoryGirl.create(:user) }

  describe 'room#with_last_message' do
    context 'when messages are exists' do
      it 'has last_message field with last message value' do
        expect(filled_room.with_last_message(insider)[:last_message]).to eq filled_room.messages.last.with_senders_name
      end
    end

    context 'when messages are not exists' do
      before do
        filled_room.messages.destroy_all
      end

      it 'has last_message field with nil value' do
        expect(filled_room.with_last_message(insider)[:last_message]).to be_nil
      end
    end
  end

  describe 'room#invite' do
    context 'when user is not invited and not inside a room' do
      it 'returns invite instance' do
        expect(filled_room.invite(outsider)).to eq Invite.last
      end
    end

    context 'when user is not invited but inside a room' do
      it 'returns nil' do
        expect(filled_room.invite(insider)).to be_nil
      end
    end

    context 'when user is invited but not inside a room' do
      before { filled_room.invite(outsider) }
      it 'returns nil' do
        expect(filled_room.invite(outsider)).to be_nil
      end
    end
  end

  describe 'room#invited?' do
    context 'when user is not invited' do
      it 'returns nil' do
        expect(filled_room.invited?(outsider)).to be_nil
      end
    end

    context 'when user is invited' do
      before { filled_room.invite(outsider) }
      it 'returns invite instance' do
        expect(filled_room.invited?(outsider)).to be_instance_of(Invite)
      end
    end
  end
end
