Rails.application.routes.draw do
  
  # Route for all colors
  GET '/api/colors', to: 'colors#index'
  


end