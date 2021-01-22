class Palette < ApplicationRecord
    has_and_belongs_to_many :colors

    def self.newRandom()
        palette = Palette.new(name: "palette-#{("a".."z").to_a.concat((0..9).to_a).shuffle.slice(0,4).join("")}")
        palette.colors.concat(Color.all.sample(5))
        palette.save()
        return palette
    end

    def self.new_from_hash(info)
        newPalette = Palette.new(name: info[:name])

        info[:color_ids].each do |cid|
            newPalette.colors << Color.find(cid)
        end

        newPalette.save()
        return newPalette
    end
end
