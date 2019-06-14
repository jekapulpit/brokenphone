# frozen_string_literal: true

FactoryGirl.define do
  factory :room do
    name 'room'

    factory :filled_room do
      transient do
        users_count 5
        messages_count 5
      end

      after(:create) do |room, evaluator|
        create_list(:user_with_messages, evaluator.users_count, send_for: room)
      end
    end

    factory :safe_room do
      secret_key OpenSSL::Cipher::AES.new(128, :CBC).random_key.bytes.join(' ')

      transient do
        users_count 1
        messages_count 5
      end

      after(:create) do |room, evaluator|
        create_list(:user_with_messages, evaluator.users_count, send_for: room)
      end
    end
  end
end
