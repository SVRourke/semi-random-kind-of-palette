class CreateColors < ActiveRecord::Migration[6.0]
  def change
    create_table :colors do |t|
      t.string :name
      t.string :hex
      t.string :red
      t.string :green
      t.string :blue
      t.string :hue
      t.string :saturation
      t.string :light
      t.string :value
      t.timestamps
    end
  end
end
