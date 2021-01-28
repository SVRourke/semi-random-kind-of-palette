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

document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector("#palettes-grid");
    getPalettes((e) => {
        e.forEach(c => {
            let p = miniPalette(c)
            p.addEventListener("click", (e) => {
                let paletteInfo = scrapeInfo(p);
                console.log(paletteInfo)
                
            })
            container.appendChild(p)
        })
    })
    

})






// { name: "Red (RYB)", hex: "#FE2712" }
// { name: "Mauve taupe", hex: "#915F6D" }
// { name: "Egyptian blue", hex: "#1034A6" }
// { name: "Safety orange (blaze orange)", hex: "#FF6700" }
/* 

    Cool Blues 
    
    CSS Variables:
    --var-red: #FE2712;
    --var-mauve-taupe: #915F6D;
    --var-egyptian-blue: #1034A6;
    --var-safety-orange: #FF6700;

    Hex Values:
    Red (RYB): #FE2712
    Mauve taupe: #915F6D
    Egyptian blue: #1034A6
    Safety orange: #FF6700

    RGB Values:
    Red (RYB): #FE2712
    Mauve taupe: #915F6D
    Egyptian blue: #1034A6
    Safety orange: #FF6700

<div id="modal-content">
    <h1 id="palette-title">Title</h1>
    <h3>CSS Variables:</h3>
    <p id="variable-display">
        --var-red: #FE2712;
        --var-mauve-taupe: #915F6D;
        --var-egyptian-blue: #1034A6;
        --var-safety-orange: #FF6700;
    </p>
    <h3>HEX Values:</h3>
    <p id="hex-display">
        Hex Values:
        Red (RYB): #FE2712
        Mauve taupe: #915F6D
        Egyptian blue: #1034A6
        Safety orange: #FF6700
    </p>
    <h3>RGB Values:</h3>
    <p id="rgb-display">
        RGB Values:
        Red (RYB): #FE2712
        Mauve taupe: #915F6D
        Egyptian blue: #1034A6
        Safety orange: #FF6700
    </p>    
</div>




*/









