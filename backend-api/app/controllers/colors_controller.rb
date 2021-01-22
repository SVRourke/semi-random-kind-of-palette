class ColorsController < ApplicationController
    def index
        colors = Color.all
        render json: colors, only: [:name, :hex]
    end

    def nRandom
        colors = Color.all.sample(params[:n].to_i)
        render json: colors, only: [:id, :name, :hex]
    end

end
