// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++    API Helper   +++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const api = {
  // Base function to send GET requests to the api
  request: async function (endpoint, count) {
    const url = 'http://localhost:3000/api/'
    const suffix = count ? `?count=${count}` : ''
    const response = await fetch((url + endpoint + suffix))
    return response.json()
  },
  // Get n colors from the api
  getColor: async function (n) {
    return await this.request('colors', n)
  },
  // Get n palettes from api
  getPalettes: async function (n) {
    return await this.request('palettes', n)
  },
  // function to post the palette data to the api
  postData: async function (params) {
    const url = 'http://localhost:3000/api/palettes'
    const response = await fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    return response.json()
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++  Render Helper  +++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const render = {
  // Creates the mini palette element for the bottom of page display
  miniPalette: function (info) {
    const row = render.newElem('div', ['row'])

    info.colors.forEach((color) => {
      const block = render.newElem('div', ['sub-color'])
      block.style.backgroundColor = color.hex
      block.setAttribute('data-color_id', color.id)
      row.appendChild(block)
    })

    const name = render.newElem('p')
    name.innerText = info.name

    const card = render.newElem('div', ['mini-card'])
    card.appendChild(row)
    card.appendChild(name)

    return card
  },

  palettes: async function (container) {
    container.innerHTML = ''
    const palettes = await api.getPalettes(3)
    palettes.forEach((p) => { container.appendChild(render.miniPalette(p)) })
  },

  // helper function to create an element with classnames
  newElem: function (tag, names) {
    const e = document.createElement(tag)
    if (names) { names.forEach((name) => { e.classList.add(name) }) }
    return e
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++  PALETTE CLASS  +++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Palette {
  constructor () {
    this.container = document.querySelector('.palette_row')
    this.nameInput = document.querySelector('#palette-title')
    this.saveButton = document.querySelector('#save')
    this.colors = []
  }

  async initColors () {
    const colors = await api.getColor(4)
    colors.forEach((color) => { this.colors.push(new Color(color)) })
  }

  async renderColors () {
    this.container.innerHTML = ''
    this.colors.forEach((color) => {
      if (this.colors.indexOf(color) === (this.colors.length - 1)) { this.makeLastColor(color) }
      this.container.appendChild(color.element)
    })
  }

  get lastColor () {
    const last = this.colors.length - 1
    return this.colors[last].element
  }

  async makeLastColor (color) {
    const elem = render.newElem('i', ['fa', 'fa-plus'])
    elem.addEventListener('click', () => {
      this.lastColor.removeChild(this.lastColor.firstChild)
      this.addColor()
    })
    color.element.insertBefore(elem, color.element.firstChild)
  }

  async addColor () {
    const color = await api.getColor(1)
    this.colors.push(new Color(color))
    this.renderColors()
  }

  async savePalette (container) {
    const colorIds = this.colors.map(c => c.id)
    if (this.nameInput.textContent === 'New Palette') {
      alert('Please enter a new name')
    } else {
      await api.postData({
        palette: { name: this.nameInput.textContent, color_ids: colorIds }
      })
      render.palettes(container)
    }
  }

  shuffle () {
    this.colors.forEach((color) => {
      if (color.element.dataset.colorUnlocked === 'true') {
        api.getColor(1).then(r => color.updateColor(r[0]))
      }
    })
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++  Color Class  +++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Color {
  constructor (color) {
    this.setAttributes(color)
    this.element = this.createColumn(color)
  }

  createColumn (color) {
    const div = render.newElem('div', ['color'])
    div.setAttribute('data-color_id', color.id)
    div.setAttribute('data-color-unlocked', true)
    div.style.backgroundColor = color.hex
    const icon = render.newElem('i', ['fa', 'fa-unlock'])
    icon.addEventListener('click', (e) => { this.toggleIcon(e.target) })
    div.appendChild(icon)
    return div
  }

  updateColor (color) {
    this.setAttributes(color)
    this.element.setAttribute('data-color_id', color.id)
    this.element.style.backgroundColor = color.hex
  }

  setAttributes (color) {
    for (const key in color) { this[key] = color[key] }
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

// ============================================================================
// ============================  MAIN RUN  ====================================
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const palette = new Palette()
  const miniPaletteContainer = document.querySelector('.palettes')

  palette.initColors().then(e => palette.renderColors())

  palette.saveButton.addEventListener('click', () => { palette.savePalette(miniPaletteContainer) })

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32 && palette.nameInput !== document.activeElement) {
      palette.shuffle()
    }
  }

  render.palettes(miniPaletteContainer)
})
