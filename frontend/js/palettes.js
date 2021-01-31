async function getPalettes (cb) {
  const url = 'http://localhost:3000/api/palettes'
  let res = await fetch(url)
  return res.json()
}

async function renderPalettes (container) {
  let palettes = await getPalettes()
  palettes.forEach(palette => {
      const p = miniPalette(palette)
      p.addEventListener('click', (e) => { renderModal(scrapeInfo(p)) })
      container.appendChild(p)    
  })
}

function newElem(tag, names) {
  const e = document.createElement(tag)
  if (names) { for (const name of names) { e.classList.add(name) } }
  return e
}

function miniPalette(info) {
  const row = newElem('div', ['row'])
  
  for (const color of info.colors) {
    const block = newElem('div', ['sub-color'])
    block.style.backgroundColor = color.hex
    block.setAttribute('data-color_hex', color.hex)
    block.setAttribute('data-color_name', color.name)
    row.appendChild(block)
  }
  
  const name = newElem('p')
  name.innerText = info.name
  
  const card = newElem('div', ['alt-mini-card'])
  card.appendChild(row)
  card.appendChild(name)

  return card
}

function scrapeInfo(palette) {
  const colors = palette.querySelectorAll('.sub-color')
  const colorData = []

  for (const color of colors) {
    console.log(color.style.backgroundColor)
    colorData.push({
      name: color.dataset.color_name,
      hex: color.dataset.color_hex,
      rgb: color.style.backgroundColor
    })
  }
  return {
    name: palette.querySelector('p').textContent,
    colors: colorData
  }
}

function renderModal(info) {
  const title = document.getElementById('palette-title')
  // const variableDisplay = document.getElementById('variable-display')
  const hexDisplay = document.getElementById('hex-display')
  const rgbDisplay = document.getElementById('rgb-display')

  title.textContent = info.name
  // variableDisplay.textContent = info;
  hexDisplay.textContent = info.colors.map(color => `${color.name}: ${color.hex}`).join('\r\n')
  rgbDisplay.textContent = info.colors.map(color => `${color.name}: ${color.rgb};`).join('\r\n')

  document.getElementById('modal').style.display = 'block'
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#palettes-grid')
  const modal = document.getElementById('modal')
  
  renderPalettes(container)
  
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  }
})
