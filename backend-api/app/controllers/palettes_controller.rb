class PalettesController < ApplicationController
    def index
        palettes = Palette.all
        render :json => palettes,
            :include => {
                :only => [:id, :name, :hex]
            },
            :except => [:created_at, :updated_at]
    end

    private

    def palette_params()
        params.require(:palette).permit(:name, :color_ids => [])
    end
        
end
