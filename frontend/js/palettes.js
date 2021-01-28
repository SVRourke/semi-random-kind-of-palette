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

document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector("#palettes-grid");
    getPalettes((e) => {
        e.forEach(c => {
            let p = miniPalette(c)
            p.addEventListener("click", (e) => {
                console.log("CLICKED")
            })
            container.appendChild(p)
        })
    })
    

})