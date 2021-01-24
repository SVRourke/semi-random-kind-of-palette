function newElem(tag, names) {
    let e = document.createElement(tag);

    if (names) {
        for(const name of names) {e.classList.add(name)}
    }
    return e
}

// Callback for event listener on main palette color lock
// toggles the locked/unlocked icon and color column's data-color-unlocked attribute
function toggleIcon(icon) {
    if (icon.classList.contains("fa-unlock")) {
        icon.classList.remove("fa-unlock")
        icon.classList.add("fa-lock")
        icon.parentElement.setAttribute("data-color-unlocked", false);
    } else {
        icon.classList.add("fa-unlock")
        icon.classList.remove("fa-lock")
        icon.parentElement.setAttribute("data-color-unlocked", true);
    }
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


// Creates and returns a column element for the main palette
function createColumn(color) {
    let div = newElem("div", ["color"]);
    div.setAttribute("data-color_id", color.id);
    div.setAttribute("data-color-unlocked", true);
    div.style.backgroundColor = color.hex;
    
    let icon = newElem("i", ["fa", "fa-unlock"])
    icon.addEventListener("click", (e) => {toggleIcon(e.target)})
    div.appendChild(icon);
    return div
}


// mainColorsContainer.appendChild(createColumn({id: 76, name: "blah", hex: "#655044"}))

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
        fetch("http://localhost:3000/api/colors?count=1")
        .then(r => r.json())
        .then((d) => {
            mainColorsContainer.appendChild(createColumn(d[0]))
        })
    }
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
