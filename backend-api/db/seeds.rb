Dir.glob("#{Rails.root}/lib/*.rb").each {|file| require file}
colors = getColors()

colors.each {|c| Color.create(c)}

25.times do |i|
    Palette.newRandom
end