# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_22_040713) do

  create_table "colors", force: :cascade do |t|
    t.string "name"
    t.string "hex"
    t.string "red"
    t.string "green"
    t.string "blue"
    t.string "hue"
    t.string "saturation"
    t.string "light"
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "colors_palettes", id: false, force: :cascade do |t|
    t.integer "color_id", null: false
    t.integer "palette_id", null: false
    t.index ["color_id"], name: "index_colors_palettes_on_color_id"
    t.index ["palette_id"], name: "index_colors_palettes_on_palette_id"
  end

  create_table "palettes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
