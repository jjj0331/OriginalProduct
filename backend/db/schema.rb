# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_02_151417) do
  create_table "detail_tasks", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_detail_tasks_on_task_id"
  end

  create_table "guidelines", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_guidelines_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "guideline_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guideline_id"], name: "index_tasks_on_guideline_id"
  end

  create_table "user_statuses", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "guideline_id", null: false
    t.integer "task_id", null: false
    t.integer "detail_task_id", null: false
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["detail_task_id"], name: "index_user_statuses_on_detail_task_id"
    t.index ["guideline_id"], name: "index_user_statuses_on_guideline_id"
    t.index ["task_id"], name: "index_user_statuses_on_task_id"
    t.index ["user_id"], name: "index_user_statuses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "detail_tasks", "tasks"
  add_foreign_key "guidelines", "users"
  add_foreign_key "tasks", "guidelines"
  add_foreign_key "user_statuses", "detail_tasks"
  add_foreign_key "user_statuses", "guidelines"
  add_foreign_key "user_statuses", "tasks"
  add_foreign_key "user_statuses", "users"
end
