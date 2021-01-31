const helper = {
  request: async function (endpoint, count) {
    const url = 'http://localhost:3000/api/'
    let suffix = count ? `?count=${count}` : "";
    let response = await fetch((url + endpoint + suffix))
    return response.json()
  },

  getColor: async function(n) {
    return await this.request("colors", n)
  },

  getPalettes: async function(n, cb) {
    return await this.request("palettes", n)        
  },
 
  // function to post the palette data to the api
  postData: async function (params) {
    const url = 'http://localhost:3000/api/palettes'
    const response = await fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response.json()
  },

}

const render = {
  miniPalette: function (info) {
    const card = render.newElem('div', ['mini-card'])
    const row = render.newElem('div', ['row'])
  
    for (const color of info.colors) {
      const block = render.newElem('div', ['sub-color'])
      block.style.backgroundColor = color.hex
      block.setAttribute('data-color_id', color.id)
      row.appendChild(block)
    }
  
    const name = render.newElem('p')
    name.innerText = info.name
    card.appendChild(row)
    card.appendChild(name)
  
    return card
  },

  // helper function to create an element with classnames
  newElem: function (tag, names) {
    const e = document.createElement(tag)
    if (names) { for (const name of names) { e.classList.add(name) } }
    return e
  },

  createIcon: async function (color, cb) {
    const elem = render.newElem('i', ['fa', 'fa-plus'])
    elem.addEventListener('click', () => cb(elem) )
    color.element.insertBefore(elem, color.element.firstChild)
  }

}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++  PALETTE CLASS  +++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Palette {
  constructor () {
    this.paletteContainer = document.querySelector('.palette_row')
    this.nameInput = document.querySelector('#palette-title')
    this.saveButton = document.querySelector('#save')
    this.colors = []
  }

  async initColors () {
    let colors = await helper.getColor(4)
    colors.forEach((color) => { this.colors.push(new Color(color)) })
  }

  async renderColors () {
    this.paletteContainer.innerHTML = ''
    this.colors.forEach((color) => {
      if (this.colors.indexOf(color) === (this.colors.length - 1)) { this.makeLastColor(color) }
      this.paletteContainer.appendChild(color.element)
    })
  }
  
  makeLastColor (color) {
    render.createIcon(color, () => {
      this.removePlus()
      this.addColor()
    })
  }

  async addColor () {
    const color = await helper.getColor(1)
    this.colors.push(new Color(color))
    this.renderColors()
  }

  removePlus () {
    const last = this.colors.length - 1
    this.colors[last].element.removeChild(this.colors[last].element.firstChild)
  }

  async savePalette (container) {
    const colorIds = this.colors.map(c => c.id)
    if (this.nameInput.textContent === 'New Palette') {
      alert('Please enter a new name')
    } else {
      await helper.postData({
        palette: { name: this.nameInput.textContent, color_ids: colorIds}
      })
      renderPalettes(container)
    }
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Color {
  constructor (color) {
    for (const key in color) { this[key] = color[key]}
    this.setAttributes(color)
    this.element = this.createColumn(color)
  }

  createColumn (color) {
    const div = render.newElem('div', ['color'])
    div.setAttribute('data-color_id', color.id)
    div.setAttribute('data-color-unlocked', true)
    div.style.backgroundColor = color.hex
    const icon = render.newElem('i', ['fa', 'fa-unlock'])
    icon.addEventListener('click', (e) => {this.toggleIcon(e.target)})
    div.appendChild(icon)
    return div
  }

  updateColor (color) {
    this.setAttributes(color)
    this.element.setAttribute('data-color_id', color.id)
    this.element.style.backgroundColor = color.hex
  }

  setAttributes (color) {
    for (const key in color) { this[key] = color[key]}
    this.unlocked = true
  }

  // Callback for event listener on main palette color lock
  // toggles the locked/unlocked icon and color column's data-color-unlocked attribute
  toggleIcon (icon) {
    if (icon.classList.contains('fa-unlock')) {
      icon.classList.replace('fa-unlock', 'fa-lock')
      icon.parentElement.setAttribute('data-color-unlocked', false)
    } else {
      icon.classList.replace('fa-lock', 'fa-unlock')
      icon.parentElement.setAttribute('data-color-unlocked', true)
    }
  }
}

async function renderPalettes (container) {
  container.innerHTML = ''
  let palettes = await helper.getPalettes(3)
  palettes.forEach((p) => { container.appendChild(render.miniPalette(p)) })
}


// ============================================================================
// ============================  MAIN RUN  ====================================
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const p = new Palette()
  const miniPaletteContainer = document.querySelector('.palettes')
  p.initColors().then(e => p.renderColors())

  p.saveButton.addEventListener('click', () => {
    p.savePalette(miniPaletteContainer)
  })

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32 && p.nameInput !== document.activeElement) {
      p.colors.forEach((c) => {
        if (c.element.dataset.colorUnlocked === 'true') {
          helper.getColor(1).then(r => c.updateColor(r[0]))
        }
      })
    }
  }
  renderPalettes(miniPaletteContainer)
})
