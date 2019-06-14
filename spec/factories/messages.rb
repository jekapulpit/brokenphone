# frozen_string_literal: true

FactoryGirl.define do
  factory :message do
    association :recipient, factory: :room
    association :sender, factory: :user
    content { Messages::EncryptOperation.new('hello', recipient).execute  }

    factory :notification do
      association :recipient, factory: :room
      association :sender, factory: :room
      content { Messages::EncryptOperation.new('hello', recipient).execute  }
    end
  end
end
