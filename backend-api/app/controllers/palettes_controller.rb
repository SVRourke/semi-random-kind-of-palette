class PalettesController < ApplicationController
    def index
        palettes = params[:count] ? Palette.all.order(created_at: :desc).limit(params[:count]) : Palette.all
        render :json => palettes, 
            :include => {
                :colors => {:only => [:id, :name, :hex]}
            }, 
            :except => [:created_at, :updated_at]
    end
    
    def show
        palette = Palette.find(params[:id])
        render json: palette, :include => {
            :colors => {:only => [:id, :name, :hex]}
        },
        :except => [:created_at, :updated_at]
    end

    def create
        palette = Palette.new_from_hash(palette_params)
        render json: {message: "#{p.name} Saved!"}
    end

    private

    def palette_params()
        params.require(:palette).permit(:name, :color_ids => [])
    end
        
end
