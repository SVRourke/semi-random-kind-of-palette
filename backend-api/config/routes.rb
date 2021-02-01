Rails.application.routes.draw do
  # Route for all colors or n random 
  # colors if a "count" query string is suplied
  # /api/colors?count=7 would return 7 random colors
  get '/api/colors', to: 'colors#index'
  # Route for all palettes
  get '/api/palettes', to: 'palettes#index'
  # Route to create a new palette
  post '/api/palettes', to: 'palettes#create'
end