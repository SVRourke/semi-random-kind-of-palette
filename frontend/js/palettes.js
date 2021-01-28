function getPalettes(cb) {
    let url = "http://localhost:3000/api/palettes";
    fetch(url)
    .then(res => res.json())
    .then(d => cb(d))
}

function newElem(tag, names) {
    let e = document.createElement(tag);
    if (names) { for(const name of names) {e.classList.add(name)}}
    return e
}

function miniPalette(info) {
    let card = newElem("div", ["alt-mini-card"]);
    let row = newElem("div", ["row"]);

    for (const color of info.colors) {
        let block = newElem('div', ['sub-color']);
        block.style.backgroundColor = color.hex;
        block.setAttribute("data-color_hex", color.hex)
        block.setAttribute("data-color_name", color.name)
        row.appendChild(block);
    }

    let name = newElem("p");
    name.innerText = info.name;
    card.appendChild(row);
    card.appendChild(name);

    return card
}

function scrapeInfo(palette) {
    let colors = palette.querySelectorAll(".sub-color")
    let colorData = [];

    for (const color of colors) {
        console.log(color.style.backgroundColor)
        colorData.push({
            name: color.dataset.color_name,
            hex: color.dataset.color_hex,
            rgb: color.style.backgroundColor
        })
    }
    return {
        name: palette.querySelector("p").textContent,
        colors: colorData
    }
}

function renderModal(info) {
    let title = document.getElementById("palette-title");
    let variableDisplay = document.getElementById("variable-display");
    let hexDisplay = document.getElementById("hex-display");
    let rgbDisplay = document.getElementById("rgb-display");

    title.textContent = info.name;
    // variableDisplay.textContent = info;
    hexDisplay.textContent = info.colors.map(color => `${color.name}: ${color.hex}`).join("\r\n");
    rgbDisplay.textContent = info.colors.map(color => `${color.name}: ${color.rgb};`).join("\r\n");

    document.getElementById("modal").style.display = "block";     

}
let mainInfo;
document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector("#palettes-grid");
    let modal = document.getElementById("modal")
    getPalettes((e) => {
        e.forEach(c => {
            let p = miniPalette(c)
            p.addEventListener("click", (e) => {
                let paletteInfo = scrapeInfo(p);
                renderModal(paletteInfo);
            })
            container.appendChild(p)
        })
    })

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    

})