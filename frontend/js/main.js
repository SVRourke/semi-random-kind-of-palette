function newElem(tag, names) {
    let e = document.createElement(tag);

    if (names) {
        for(const name of names) {e.classList.add(name)}
    }
    return e
}

function miniPalette(info) {
    let card = newElem("div", ["mini-card"]);
    let row = newElem("div", ["row"]);

    for (const color of info.colors) {
        let block = newElem('div', ['sub-color']);
        block.style.backgroundColor = color.hex;
        block.setAttribute("data-color_id", color.id)
        row.appendChild(block);
    }

    let name = newElem("p");
    name.innerText = info.name;
    card.appendChild(row);
    card.appendChild(name);

    return card
}


let mainColorsContainer = document.querySelector(".palette_row");


// <div class="color" id="four">
//     <i class="fa fa-lock"></i>
// </div>

// <div class="color" id="five">
//     <i class="fa fa-unlock"></i>
// </div>






document.addEventListener("DOMContentLoaded", () => {
    container = document.querySelector("section.palettes")
    fetch("http://localhost:3000/api/palettes?count=3")
    .then(r => r.json())
    .then((d) => {
        for (const o of d) {container.appendChild(miniPalette(o))}
    })
    .catch(e => console.log(e));
});








//--------------------------------------------------------
// for (const column of columns) {
//     fetch("http://localhost:3000/api/colors?count=1")
//       .then(r => r.json())
//     .then((d) => {
//       let hex = d[0].hex
//       console.log(hex);
//       column.style.background = d[0].hex;
//     })
//     .catch(e => console.log('ERROR', e))
//    }
//--------------------------------------------------------
// fetch("http://localhost:3000/api/palettes?single=true")
// .then(r => r.json())
// .then(d => console.log(d))
// .catch(e => console.log(e));
//--------------------------------------------------------
// fetch("http://localhost:3000/api/palettes?single=true")
// .then(r => r.json())
// .then((d) => {
//   console.log(d)
//   container.appendChild(miniPalette(d[0]));
// })
// .catch(e => console.log(e));
