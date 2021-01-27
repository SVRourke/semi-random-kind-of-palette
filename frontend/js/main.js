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
    }
}


// Callback for event listener on main palette color lock
// toggles the locked/unlocked icon and color column's data-color-unlocked attribute
function toggleIcon(icon) {
    if (icon.classList.contains("fa-unlock")) {
        icon.classList.replace("fa-unlock", "fa-lock")
        icon.parentElement.setAttribute("data-color-unlocked", false);
    } else {
        icon.classList.replace("fa-lock", "fa-unlock")
        icon.parentElement.setAttribute("data-color-unlocked", true);
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

// ADDED TO COLOR CLASS
// Creates and returns a column element for the main palette
function createColumn(color) {
    let div = helper.newElem("div", ["color"]);
    div.setAttribute("data-color_id", color.id);
    div.setAttribute("data-color-unlocked", true);
    div.style.backgroundColor = color.hex;
    
    let icon = helper.newElem("i", ["fa", "fa-unlock"])
    icon.addEventListener("click", (e) => {toggleIcon(e.target)})
    div.appendChild(icon);
    return div
}


// ADDED TO COLOR
function updateColor(element, color) {
    element.setAttribute("data-color_id", color.id);
    element.style.backgroundColor = color.hex;
}

let mainColorsContainer = document.querySelector(".palette_row");
    
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// let p = new Palette;
// p.initializeColors(3)
// p.renderColors()
class Palette {
    constructor() {
        this.paletteContainer = document.querySelector(".palette_row");
        this.nameInput = document.querySelector("#palette-title")
        this.colors = [];

    }

    async initColors() {
        await helper.getColor(4)
        .then((c) => {
            c.forEach((color) => {this.colors.push(new Color(color))})
        })
    }

    renderColors() {
        this.paletteContainer.innerHTML = "";
        for (const color of this.colors) {this.paletteContainer.appendChild(color.element)}
    }

    savePalette() {
        let color_ids = this.colors.map(c => c.id)
        ;
        if (this.nameInput.textContent == "New Palette") {
            alert("Please enter a new name")
        } else { console.log("SAVING....")}
        console.log(name, color_ids)
    }
}

class Color {
    constructor(color) {
        for (const key in color) { this[key] = color[key]}
        this.setAttributes(color)
        this.element = createColumn(color)
        
    }

    createColumn(color) {
        let div = helper.newElem("div", ["color"]);
        div.setAttribute("data-color_id", color.id);
        div.setAttribute("data-color-unlocked", true);
        div.style.backgroundColor = color.hex;
        
        let icon = helper.newElem("i", ["fa", "fa-unlock"])
        icon.addEventListener("click", (e) => {toggleIcon(e.target)})
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

    
}

let p = new Palette;

document.addEventListener("DOMContentLoaded", () => {
    p.initColors()
    .then(e => p.renderColors())

    document.body.onkeyup = function(e){
        if(e.keyCode == 32 && p.nameInput !== document.activeElement){
            p.colors.forEach((c) => {
                if (c.element.dataset.colorUnlocked == "true") {
                    helper.getColor(1).then(r => c.updateColor(r[0]))
                }
            })
            console.log()
            // for (const col of mainColorsContainer.children) {
            //     if (col.dataset.colorUnlocked == "true") {
            //         helper.getColor((c) => {
            //             updateColor(col, c)
            //         })
            //     }
            }
        }
})






// document.addEventListener("DOMContentLoaded", () => {
//     container = document.querySelector("section.palettes")
//     fetch("http://localhost:3000/api/palettes?count=3")
//     .then(r => r.json())
//     .then((d) => {
//         for (const o of d) {container.appendChild(miniPalette(o))}
//     })
//     .catch(e => console.log(e));

//     for (let i = 0; i < 5; i++) {
//         helper.getColor(c => mainColorsContainer.appendChild(createColumn(c)))
//     }


//     document.body.onkeyup = function(e){
//         if(e.keyCode == 32){
//             console.log("pressed")
//             for (const col of mainColorsContainer.children) {
//                 if (col.dataset.colorUnlocked == "true") {
//                     helper.getColor((c) => {
//                         updateColor(col, c)
//                     })
//                 }
//             }
//         }
//     }
// });
