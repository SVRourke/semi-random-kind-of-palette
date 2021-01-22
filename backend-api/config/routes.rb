Rails.application.routes.draw do
  
  # Route for all colors
  get '/api/colors', to: 'colors#index'
  # Route for N random colors
  get '/api/:n/colors', to: 'colors#nRandom'

  # Route for all palettes
  get '/api/palettes', to: 'palettes#index'

  # Route to create a new palette
  post '/api/palettes', to: 'palettes#create'


end