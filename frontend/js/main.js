const helper = {
    // helper function to create an element with classnames
    newElem: function(tag, names) {
        let e = document.createElement(tag);
        if (names) { for(const name of names) {e.classList.add(name)}}
        return e
    },
    // function to get n colors from api
    getColor: async function(n) {
        let url = `http://localhost:3000/api/colors?count=${n}`;
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) { console.log(error)}
    },
    // function to post the palette data to the api
    postData: async function(params) {
        let url = "http://localhost:3000/api/palettes";
        let response = await fetch(url, {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
        return response.json()
    },

    getPalettes: async function(n, cb) {
        let url = "http://localhost:3000/api/palettes";
        if (n) { url += `?count=${n}`}

        fetch(url)
        .then(res => res.json())
        .then(d => cb(d))
    }
}


function miniPalette(info) {
    let card = helper.newElem("div", ["mini-card"]);
    let row = helper.newElem("div", ["row"]);

    for (const color of info.colors) {
        let block = helper.newElem('div', ['sub-color']);
        block.style.backgroundColor = color.hex;
        block.setAttribute("data-color_id", color.id)
        row.appendChild(block);
    }

    let name = helper.newElem("p");
    name.innerText = info.name;
    card.appendChild(row);
    card.appendChild(name);

    return card
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Palette {
    constructor() {
        this.paletteContainer = document.querySelector(".palette_row");
        this.nameInput = document.querySelector("#palette-title")
        this.saveButton = document.querySelector("#save")
        this.colors = [];

    }

    async initColors() {
        await helper.getColor(4)
        .then((c) => {
            c.forEach((color) => {
                this.colors.push(new Color(color))
            })
        })
    }

    renderColors() {
        this.paletteContainer.innerHTML = "";
        for (const color of this.colors) {
            this.paletteContainer.appendChild(color.element)
        }
    }

    async savePalette(container) {
        let color_ids = this.colors.map(c => c.id);
        if (this.nameInput.textContent == "New Palette") {
            alert("Please enter a new name")
        } else { 
            await helper.postData({
                palette: { name: this.nameInput.textContent, color_ids: color_ids}
            });
            renderPalettes(container)
        }
    }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Color {
    constructor(color) {
        for (const key in color) { this[key] = color[key]}
        this.setAttributes(color)
        this.element = this.createColumn(color)
        
    }

    createColumn(color) {
        let div = helper.newElem("div", ["color"]);
        div.setAttribute("data-color_id", color.id);
        div.setAttribute("data-color-unlocked", true);
        div.style.backgroundColor = color.hex;
        
        let icon = helper.newElem("i", ["fa", "fa-unlock"])
        icon.addEventListener("click", (e) => {this.toggleIcon(e.target)})
        div.appendChild(icon);
        return div
    }

    updateColor(color) {
        this.setAttributes(color)
        this.element.setAttribute("data-color_id", color.id);
        this.element.style.backgroundColor = color.hex;
    }

    setAttributes(color) {
        for (const key in color) { this[key] = color[key]}
        this.unlocked = true
    }

    // Callback for event listener on main palette color lock
    // toggles the locked/unlocked icon and color column's data-color-unlocked attribute
    toggleIcon(icon) {
        if (icon.classList.contains("fa-unlock")) {
            icon.classList.replace("fa-unlock", "fa-lock")
            icon.parentElement.setAttribute("data-color-unlocked", false);
        } else {
            icon.classList.replace("fa-lock", "fa-unlock")
            icon.parentElement.setAttribute("data-color-unlocked", true);
        }
    }

    
}
function renderPalettes(container) {
    container.innerHTML  = "";
    helper.getPalettes(3, (e) => {
        for (const palette of e) {
            container.appendChild(miniPalette(palette));
        }
    })


}
// CHANGE RELOAD TO RE-RENDER
// ADD LINK TO VIEW ALL PALETTES
document.addEventListener("DOMContentLoaded", () => {
    let p = new Palette;
    let miniPaletteContainer = document.querySelector(".palettes");
    p.initColors().then(e => p.renderColors())

    p.saveButton.addEventListener("click", () => {
        p.savePalette(miniPaletteContainer)
    })
    
    document.body.onkeyup = function(e){
        if(e.keyCode == 32 && p.nameInput !== document.activeElement){
            p.colors.forEach((c) => {
                if (c.element.dataset.colorUnlocked == "true") {
                    helper.getColor(1).then(r => c.updateColor(r[0]))
                }
            })
        }
    }
    renderPalettes(miniPaletteContainer)
    // helper.getPalettes(3, (e) => {
    //     for (const palette of e) {
    //         miniPaletteContainer.appendChild(miniPalette(palette));
    //     }
    // })

    // EXAMPLE OF GENERATED CARD 
    // <div class="mini-card">
    // <div class="row">
    //     <div class="sub-color"></div>
    //     <div class="sub-color"></div>
    //     <div class="sub-color"></div>
    //     <div class="sub-color"></div>
    // </div>

    // <p>palette-skldm2lwm</p>
    // </div>



})