# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(email: 'fcbb96@mail.ru', password: '123456', confirmed_at: DateTime.now)
user2 = User.create(email: 'fcbb95@mail.ru', password: '123456', confirmed_at: DateTime.now)
room = Room.create(name: 'priv')
room.users << user1
room.users << user2
Message.create(content: 'sdasd', sender: user1, recipient: room)
Message.create(content: 'sddsaasdasd', sender: user1, recipient: room)
Message.create(content: 'sdaasdasdasdadsd', sender: user2, recipient: room)
Message.create(content: 'sdasasdasdasdasdasdd', sender: user2, recipient: room)
