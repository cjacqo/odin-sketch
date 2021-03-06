let grid = {
    cols: 16,
    rows: 16,
    color: `rgba(0, 0, 0, 0)`,
    matrix: [],
    clear: false,
    state: 'drawing',
    rainbowOn: false,
    shaderOn: false,
    isDrawing: false
}

let displayGrid = document.querySelector('.display-grid')
let container = document.createElement('div')
let inputSection = document.querySelector('.input-section')
let sliderSection = document.querySelector('.slider-section')

// --- click listener to track when user is trying to alter the drawing
container.addEventListener('mousedown', () => {
    grid.isDrawing = true
})
container.addEventListener('mouseup', () => {
    grid.isDrawing = false
})

// --- create elements based on the cols and rows of the grid,
//     then return the 2D matrix
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

// --- reset the current grid objects matrix, then remake the grid,
//     + loop over the new grid objects matrix to then append
//       cells that can be hovered to change (draw) the color onto
function displayMatrix() {
    grid.matrix = []
    grid.matrix = makeGrid(grid.cols, grid.rows)

    container.classList.add('matrix', 'parent')
    container.style.setProperty('--grid-rows', grid.rows)
    container.style.setProperty('--grid-cols', grid.cols)
    
    grid.matrix.forEach(el => {
        el.map(ce => {
            ce.style.backgroundColor = `rgba(0,0,0,0)`
            ce.setAttribute('data-count', `0`)
            ce.setAttribute('is-filled', 'false')
            ce.addEventListener('mouseover', () => {
                if (grid.isDrawing) {
                    countHover(ce)
                }
                return
            })
            container.appendChild(ce)
        })
    })
    displayGrid.appendChild(container)
}

// INPUT ELEMENTS, BUTTONS & ATTRIBUTES
let drawBtn = document.createElement('button')
drawBtn.innerHTML = `<i class="fa-solid fa-paintbrush"></i>`
drawBtn.style.color = 'green'
let clearMatrixBtn = document.createElement('button')
clearMatrixBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
let eraserBtn = document.createElement('button')
eraserBtn.innerHTML = `<i class="fa-solid fa-eraser"></i>`
let rainbowBtn = document.createElement('button')
rainbowBtn.innerHTML = `<i class="fa-solid fa-rainbow"></i>`
let shaderBtn = document.createElement('button')
shaderBtn.style.color = '#CCCCCC'
shaderBtn.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>`
let colorPicker = document.createElement('input')
colorPicker.setAttribute('type', 'color')
colorPicker.setAttribute('id', 'color')
colorPicker.setAttribute('value', 'rgba(0,0,0,0)')
let roundColor = document.createElement('div')
roundColor.setAttribute('id', 'colorWrapper')
roundColor.style.backgroundColor = '#000000'
let slider = document.createElement('input')
slider.setAttribute('type', 'range')
slider.setAttribute('id', 'slider')
slider.setAttribute('min', '16')
slider.setAttribute('max', '100')
slider.setAttribute('value', `${grid.cols}`)
let gridSizeTextContainer = document.createElement('div')
gridSizeTextContainer.innerHTML = `<p class="text">${grid.cols} x ${grid.rows}</p>`

// EVENT LISTENERS
// --- set the state for user to 'drawing'
drawBtn.addEventListener('click', () => {
    setState('drawing')
})
// --- set the state for user to 'erasing'
eraserBtn.addEventListener('click', () => {
    setState('erasing')
})
// --- get the value of the slider to set the grid size
slider.oninput = function() {
    setGridSize()
    clearCells(grid.matrix)
}
// --- get the value of the colorPicker to set the color
colorPicker.oninput = function() {
    setColor()
}
// --- erase the entire board
clearMatrixBtn.addEventListener('click', () => {
    clearCells(grid.matrix)
})
// --- turn rainbow feature on
rainbowBtn.addEventListener('click', () => {
    grid.rainbowOn = !grid.rainbowOn
    rainbowBtn.style.color = grid.rainbowOn ? 'purple' : 'black'
    console.log(grid)
})
// --- enable the shade feature
shaderBtn.addEventListener('click', () => {
    grid.shaderOn = !grid.shaderOn
    console.log("Hi")
    shaderBtn.style.color = grid.shaderOn ? 'black' : '#ccc'
})

// FUNCTIONS
// --- reset each cell in the matrix to default values
function clearCells(m) {
    m.forEach(el => {
        el.map(ce => {
            container.removeChild(ce)
        })
    })
    displayMatrix()
}
// --- update the grid size from the input value of the slider
function setGridSize() {
    let val = document.getElementById('slider').value
    gridSizeTextContainer.innerHTML = `<p class="text">${val} x ${val}</p>`
    grid.cols = val
    grid.rows = val
}
// --- set the color of the grid object that will be drawn when hovered
function setColor() {
    let val = document.getElementById('color').value
    let rgba = hexToRgbA(val)
    // --- update the round background-color
    roundColor.style.backgroundColor = val
    if (grid.rainbowOn) {
        grid.rainbowOn = false
        rainbowBtn.style.color = 'black'
    }
    grid.color = rgba
}
// --- hover the cell to draw
//     + will track the amount of times to darken the cell,
//       as well as track the selected color
//     + controls features and settings for how to color a cell
function countHover(cell) {
    let count = parseInt(cell.getAttribute('data-count'))
    let isFilled = cell.getAttribute('is-filled')

    // --- extract values from grid.color
    let { color } = grid
    let values

    // --- check if isFilled is true
    switch(isFilled) {
        case 'true':
            if (grid.state === 'erasing') {
                cell.style.backgroundColor = `rgba(0,0,0,0)`
                cell.setAttribute('is-filled', 'false')
            }
            return
        case 'false':
            if (grid.state === 'erasing') {
                cell.style.backgroundColor = `rgba(0,0,0,0)`
                cell.setAttribute('is-filled', 'false')
            } else {
                // - check 1) check for rainbow mode to determine color
                if (grid.rainbowOn) {
                    rgbaString = getRandomColor()
                    values = rgbaString.substring(5, rgbaString.length - 1).split(',')
                } else {
                    values = color.substring(5, color.length - 1).split(',')
                }

                // - check 2) shader is on
                if (grid.shaderOn) {
                    // --- check if cells background color is not white
                    if (isFilled === 'true') {
                        return
                    } else {
                        count++
                        if (count === 9) {
                            cell.style.backgroundColor = `rgba(${values[0]},${values[1]},${values[2]},${1})`
                            cell.setAttribute('is-filled', 'true')
                        }
                        cell.style.backgroundColor = `rgba(${values[0]},${values[1]},${values[2]},0.${count})`
                        cell.setAttribute('data-count', `${count}`)
                    }
                } else {
                    count = 1
                    cell.style.backgroundColor = `rgba(${values[0]},${values[1]},${values[2]},${1})`
                    cell.setAttribute('data-count', `${count}`)
                    cell.setAttribute('is-filled', 'true')
                }
            }
        default:
            return
    }

}
// --- set action state for user
function setState(value) {
    grid.state = value
    drawBtn.style.color = value === 'drawing' ? 'green' : 'black'
    eraserBtn.style.color = value === 'erasing' ? 'pink' : 'black'
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
// --- generate a random rgba string
function getRandomColor() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return `rgba(${r}, ${g}, ${b}, 0)`
}

displayMatrix()

sliderSection.appendChild(gridSizeTextContainer)
sliderSection.appendChild(slider)
inputSection.appendChild(drawBtn)
inputSection.appendChild(eraserBtn)
inputSection.appendChild(clearMatrixBtn)
inputSection.appendChild(rainbowBtn)
inputSection.appendChild(shaderBtn)
inputSection.appendChild(colorPicker)
inputSection.appendChild(roundColor)