require 'nokogiri'
require 'open-uri'

def convertToHash(zippedRows)
    headers = ['name', 'hex', 'red', 'green', 'blue', 'hue', 'saturation', 'light', 'value']
    formattedRows = []
    zippedRows.each do |r|
        rowHash = {}
        headers.each_with_index {|value, index| rowHash[value.to_sym] = r[index]}
        formattedRows.push(rowHash)
    end
    return formattedRows
end

def convertToText(table)
    rows = []
    table.each do |r|
        buff = []
        r.children.each {|c| buff.push(c.text.chomp.gsub(/%|°/, ""))}
        rows.push(buff.reject {|e| e.empty?})
    end
    return rows
end

def parseDocToArray(document)
    table = document.css(".wikitable").css("tbody").css("tr")
    headers = table.shift().css("th").map {|e| e.text.gsub(/$\n|\s\(([^)]+)\)\n/, "")}
    rows = convertToText(table)
    return convertToHash(rows)
end
# 
def downloadPages()
    base_url = "https://en.wikipedia.org/wiki/List_of_colors:"
    suffixes = ["_A-F", "_G-M", "_N-Z"]
    pages = []
    
    suffixes.each do |s|
        html = open(base_url + s)
        pages.push(Nokogiri::HTML(html))
    end
    return pages
end

def getColors()
    pages = downloadPages()
    colors = []
    pages.each {|p| colors.concat(parseDocToArray(p))}
    return colors
end
