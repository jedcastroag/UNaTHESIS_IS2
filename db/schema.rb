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

ActiveRecord::Schema.define(version: 2019_03_02_220728) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "thesis_project_id", null: false
    t.bigint "users_id", null: false
    t.string "title", null: false
    t.string "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thesis_project_id"], name: "index_comments_on_thesis_project_id"
    t.index ["users_id"], name: "index_comments_on_users_id"
  end

  create_table "event_logs", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "thesis_project_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thesis_project_user_id"], name: "index_event_logs_on_thesis_project_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.text "question"
    t.bigint "user_id"
    t.bigint "thesis_project_id"
    t.index ["thesis_project_id"], name: "index_questions_on_thesis_project_id"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "support_documents", force: :cascade do |t|
    t.string "document", null: false
    t.bigint "event_log_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_log_id"], name: "index_support_documents_on_event_log_id"
  end

  create_table "thesis", force: :cascade do |t|
    t.bigint "thesis_project_father_id"
    t.bigint "thesis_project_associated_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thesis_project_associated_id"], name: "index_thesis_on_thesis_project_associated_id"
    t.index ["thesis_project_father_id"], name: "index_thesis_on_thesis_project_father_id"
  end

  create_table "thesis_project_roles", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "thesis_project_users", force: :cascade do |t|
    t.bigint "thesis_project_roles_id", null: false
    t.bigint "thesis_project_id", null: false
    t.bigint "user_id", null: false
    t.boolean "confirmed", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thesis_project_id", "user_id"], name: "index_thesis_project_users_on_thesis_project_id_and_user_id", unique: true
    t.index ["thesis_project_id"], name: "index_thesis_project_users_on_thesis_project_id"
    t.index ["thesis_project_roles_id"], name: "index_thesis_project_users_on_thesis_project_roles_id"
    t.index ["user_id", "thesis_project_id"], name: "index_thesis_project_users_on_user_id_and_thesis_project_id", unique: true
    t.index ["user_id"], name: "index_thesis_project_users_on_user_id"
  end

  create_table "thesis_projects", force: :cascade do |t|
    t.string "title", null: false
    t.string "document"
    t.text "description"
    t.boolean "approbation_state"
    t.boolean "activation_state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.bigint "user_type_id"
    t.string "name", null: false
    t.string "surname", null: false
    t.string "dni", null: false
    t.string "email", null: false
    t.string "institution", default: "universidad nacional de colombia", null: false
    t.string "country", default: "colombia", null: false
    t.string "password_digest", null: false
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["user_type_id"], name: "index_users_on_user_type_id"
  end

  add_foreign_key "comments", "thesis_projects"
  add_foreign_key "comments", "users", column: "users_id"
  add_foreign_key "event_logs", "thesis_project_users"
  add_foreign_key "questions", "thesis_projects"
  add_foreign_key "questions", "users"
  add_foreign_key "thesis", "thesis_projects", column: "thesis_project_associated_id"
  add_foreign_key "thesis", "thesis_projects", column: "thesis_project_father_id"
  add_foreign_key "thesis_project_users", "thesis_project_roles", column: "thesis_project_roles_id"
  add_foreign_key "thesis_project_users", "thesis_projects"
  add_foreign_key "thesis_project_users", "users"
  add_foreign_key "users", "user_types"
end
