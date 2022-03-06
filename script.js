let grid = {
    cols: 16,
    rows: 16,
    color: `rgba(0, 0, 0, 0)`,
    matrix: [],
    clear: false
}

let displayGrid = document.querySelector('.display-grid')
let container = document.createElement('div')
let inputSection = document.querySelector('.input-section')

function makeGrid(cols, rows) {
    let column = []
    for (let c = 0; c < cols; c++) {
        let row = []
        for (let r = 0; r < rows; r++) {
            let div = document.createElement('div')
            div.classList.add('cell')
            row.push(div)
        }
        column.push(row)
    }
    return column
}

function displayMatrix() {
    grid.matrix = []
    grid.matrix = makeGrid(grid.cols, grid.rows)
    console.log(grid)

    container.classList.add('matrix', 'parent')
    container.style.setProperty('--grid-rows', grid.rows)
    container.style.setProperty('--grid-cols', grid.cols)
    
    grid.matrix.forEach(el => {
        el.map(ce => {
            ce.style.backgroundColor = `rgba(0,0,0,0)`
            ce.setAttribute('data-count', `0`)
            ce.addEventListener('mouseover', () => {
                countHover(ce)
            })
            container.appendChild(ce)
        })
    })
    displayGrid.appendChild(container)
}

// INPUT ELEMENTS, BUTTONS & ATTRIBUTES
let slider = document.createElement('input')
slider.setAttribute('type', 'range')
slider.setAttribute('id', 'slider')
slider.setAttribute('min', '16')
slider.setAttribute('max', '100')
slider.setAttribute('value', `${grid.cols}`)
let clearMatrixBtn = document.createElement('button')
let drawMatrixBtn = document.createElement('button')
drawMatrixBtn.setAttribute('disabled', 'true')
drawMatrixBtn.setAttribute('id', 'drawBtn')
clearMatrixBtn.innerText = "Clear"
drawMatrixBtn.innerText = "Draw Matrix"
let colorPicker = document.createElement('input')
colorPicker.setAttribute('type', 'color')
colorPicker.setAttribute('id', 'color')
colorPicker.setAttribute('value', 'rgba(0,0,0,0)')

// EVENT LISTENERS
// --- get the value of the slider to set the grid size
slider.oninput = function() {
    setGridSize()
}
// --- get the value of the colorPicker to set the color
colorPicker.oninput = function() {
    setColor()
}
// --- erase the entire board
clearMatrixBtn.addEventListener('click', () => {
    clearCells(grid.matrix)
})
// --- draw the board
drawMatrixBtn.addEventListener('click', () => {
    clearCells(grid.matrix)
})

// FUNCTIONS
// --- reset each cell in the matrix to default values
function clearCells(m) {
    m.forEach(el => {
        el.map(ce => {
            container.removeChild(ce)
        })
    })
    document.getElementById('drawBtn').disabled = true
    displayMatrix()
}
// --- update the grid size from the input value of the slider
function setGridSize() {
    let val = document.getElementById('slider').value
    if (val !== grid.cols) {
        document.getElementById('drawBtn').disabled = false
    }
    grid.cols = val
    grid.rows = val
}
// --- set the color of the grid object that will be drawn when hovered
function setColor() {
    let val = document.getElementById('color').value
    let rgba = hexToRgbA(val)
    grid.color = rgba
}
// --- hover the cell to draw
//     + will track the amount of times to darken the cell,
//       as well as track the selected color
function countHover(cell) {
    let count = parseInt(cell.getAttribute('data-count'))

    // --- extract values from grid.color
    let { color } = grid
    let values = color.substring(5, color.length - 1).split(',')

    // --- add to how many times a cell has been hovered to shade the cell
    count++
    if (count < 9) {
        cell.style.backgroundColor = `rgba(${values[0]},${values[1]},${values[2]},0.${count})`
        cell.setAttribute('data-count', `${count}`)
    }
}

// HELPER FUNCTIONS
// --- convert hex value from colorPicker to rgb
//     @RESOURCE: https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
function hexToRgbA(hex) {
    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0)'
    }
    throw new Error('Bad Hex')
}

displayMatrix()

inputSection.appendChild(slider)
inputSection.appendChild(clearMatrixBtn)
inputSection.appendChild(drawMatrixBtn)
inputSection.appendChild(colorPicker)