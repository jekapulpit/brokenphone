# frozen_string_literal: true
FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "person#{n}@example.com" }
    full_name 'zheka'

    factory :user_with_messages do
      transient do
        messages_count 5
        send_for nil
      end

      after(:create) do |user, evaluator|
        create_list(:message, evaluator.messages_count, sender: user, recipient: evaluator.send_for)
      end
    end
  end
end
