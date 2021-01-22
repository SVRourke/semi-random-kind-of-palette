class ColorsController < ApplicationController
    # Renders all colors or n random colors 
    # /api/colors?count=7 would return 7 random colors
    def index
        colors = params[:count] ? Color.all.sample(params[:count].to_i) : Color.all
        render json: colors, only: [:id, :name, :hex]
    end
end
