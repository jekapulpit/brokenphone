# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_15_123206) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'invites', force: :cascade do |t|
    t.string 'content'
    t.bigint 'user_id'
    t.bigint 'room_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'status', default: 0
    t.index ['room_id'], name: 'index_invites_on_room_id'
    t.index ['user_id'], name: 'index_invites_on_user_id'
  end

  create_table 'messages', force: :cascade do |t|
    t.text 'content'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'sender_id'
    t.integer 'recipient_id'
    t.string 'recipient_type'
    t.string 'sender_type'
  end

  create_table 'room_relations', force: :cascade do |t|
    t.bigint 'room_id'
    t.bigint 'user_id'
    t.integer 'status'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'unreaded_number', default: 0
    t.index ['room_id'], name: 'index_room_relations_on_room_id'
    t.index ['user_id'], name: 'index_room_relations_on_user_id'
  end

  create_table 'rooms', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'secret_key'
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key 'invites', 'rooms'
  add_foreign_key 'invites', 'users'
  add_foreign_key 'room_relations', 'rooms'
  add_foreign_key 'room_relations', 'users'
end
