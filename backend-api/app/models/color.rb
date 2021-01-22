class Color < ApplicationRecord
    has_and_belongs_to_many :palettes

    def palette_count()
        return self.palettes.count()
    end
end
