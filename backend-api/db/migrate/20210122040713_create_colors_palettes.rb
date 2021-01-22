class CreateColorsPalettes < ActiveRecord::Migration[6.0]
  def change
    create_join_table :colors, :palettes do |t|
      t.index :color_id
      t.index :palette_id
    end
  end
end
