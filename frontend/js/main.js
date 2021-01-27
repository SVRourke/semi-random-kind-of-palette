const helper = {
    newElem: function(tag, names) {
        let e = document.createElement(tag);
        if (names) { for(const name of names) {e.classList.add(name)}}
        return e
    },

    getColor: function(cb) {
        fetch("http://localhost:3000/api/colors?count=1")
        .then(r => r.json())
        .then(d => cb(d[0]))
        .catch(e => alert("Network Error Try Again"));
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

document.addEventListener("DOMContentLoaded", () => {
    container = document.querySelector("section.palettes")
    fetch("http://localhost:3000/api/palettes?count=3")
    .then(r => r.json())
    .then((d) => {
        for (const o of d) {container.appendChild(miniPalette(o))}
    })
    .catch(e => console.log(e));

    for (let i = 0; i < 5; i++) {
        helper.getColor(c => mainColorsContainer.appendChild(createColumn(c)))
    }


    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            console.log("pressed")
            for (const col of mainColorsContainer.children) {
                if (col.dataset.colorUnlocked == "true") {
                    helper.getColor((c) => {
                        updateColor(col, c)
                    })
                }
            }
        }
    }
});

// classes
// Palette
// messenger

// Palette
// renderPalette
// reorder colors
// savePalette

class Palette {
    constructor() {
        this.name = `new palette`;
        this.colors = [];
    }

    renderColors(container) {
        container.innerHTML = "";
        for (const color of this.colors) {container.appendChild(color.element)}
    }

    getRandomColors(n) {
        for (let i = 0; i < n; i++) {
            helper.getColor((c) => {
                this.colors.push(new Color(c))
            })
        }
    }
}

class Color {
    constructor(color) {
        for (const key in color) { this[key] = color[key]}

        this.unlocked = true
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
        for (const key in color) { this[key] = color[key]}
        // this.name = color.name
        // this.id = color.id
        this.hex = color.hex
        this.element.setAttribute("data-color_id", color.id);
        this.element.style.backgroundColor = color.hex;
    }
}