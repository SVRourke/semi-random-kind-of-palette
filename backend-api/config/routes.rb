Rails.application.routes.draw do
  
  # Route for all colors
  GET '/api/colors', to: 'colors#index'
  # Route for N random colors
  GET '/api/:n/colors', to: 'colors#nRandom'

  # Route for all palettes
  GET '/api/palettes', to: 'palettes#index'
  


end