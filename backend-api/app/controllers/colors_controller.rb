class ColorsController < ApplicationController
    def index
        colors = Color.all
        render json: colors, only: [:name, :hex]
    end

end
