let grid = {
    cols: 16,
    rows: 16,
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

function countHover(cell) {
    let count = parseInt(cell.getAttribute('data-count'))
    count++
    if (count < 9) {
        cell.style.backgroundColor = `rgba(0,0,0,0.${count})`
        cell.setAttribute('data-count', `${count}`)
    }
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

let slider = document.createElement('input')
slider.setAttribute('type', 'range')
slider.setAttribute('id', 'slider')
slider.setAttribute('min', '16')
slider.setAttribute('max', '100')
slider.setAttribute('value', `${grid.cols}`)
let clearMatrixBtn = document.createElement('button')
let drawMatrixBtn = document.createElement('button')
clearMatrixBtn.innerText = "Clear"
drawMatrixBtn.innerText = "Draw Matrix"

// EVENT LISTENERS
// --- get the value of the slider to set the grid size
slider.oninput = function() {
    setGridSize()
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
    displayMatrix()
}
// --- update the grid size from the input value of the slider
function setGridSize() {
    let val = document.getElementById('slider').value
    grid.cols = val
    grid.rows = val
}

displayMatrix()

inputSection.appendChild(slider)
inputSection.appendChild(clearMatrixBtn)
inputSection.appendChild(drawMatrixBtn)