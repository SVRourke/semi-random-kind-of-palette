# Semi Random Kind Of Palette
This is an app I created to gain a better understanding of object oriented and asynchronous JavaScript by making requests to an api from a JS frontend. This app is a bare-bones clone of [Coolors](https://coolors.co/), the user is presented with a palette interface which they can randomize by pressing the space-bar.

## Installation
To install this application; clone the repo and cd into the main folder, from the main folder cd into the '/backend-api' folder and run
``` bash
    bundle install
```
Once rails has installed the necessary gems, you must create, migrate and seed the database
```ruby
    rails db:create db:migrate db:seed
```
NOTE The seeding process relies on web scraping to acquire the color information and as such will not work without an internet connection

After the database is seeded you can verify by opening a rails console with rails c and checking the color count
```ruby
    Color.count
=> 971
```
## Usage
To use the app, first start the API server from the /backend-api folder
```ruby
    rails s
```
Then open the index.html file found in the frontend folder in a web browser.

To randomize the colors press the space-bar, If you like a color and would like to prevent it from being randomized toggle the lock icon. If you would like to add an additional color column press the plus icon.

To save a palette to the database first change the title, then press the save icon. Your newly saved palette will be rendered beneath the palette ui.

Clicking the view more link at the bottom of the page will take you to the palette index, if you click on a palette card a modal will pop up with the name, hex, and rgb values for each color in the palette.

## Contributing
I do not intend to do anything with this project so if you are interested in expanding this project or using any pieces of go ahead, I would prefer you fork it for yourself.

## License
[MIT](https://choosealicense.com/licenses/mit/)