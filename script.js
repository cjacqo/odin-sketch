let grid = {
    cols: 16,
    rows: 16,
    matrix: []
}

let displayGrid = document.querySelector('.display-grid')


function makeGrid() {
    let column = []
    for (let c = 0; c < grid.cols; c++) {
        let row = []
        for (let r = 0; r < grid.rows; r++) {
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
    cell.setAttribute('data-count', `${count}`)
}

function displayMatrix(m) {
    let container = document.createElement('div')
    container.classList.add('matrix', 'parent')
    container.style.setProperty('--grid-rows', grid.rows)
    container.style.setProperty('--grid-cols', grid.cols)
    m.forEach(el => {
        el.map(ce => {
            ce.setAttribute('data-count', '0')
            ce.addEventListener('mouseover', () => {
                countHover(ce)
            })
            container.appendChild(ce)
        })
    })
    displayGrid.appendChild(container)
}

grid.matrix = makeGrid()

displayMatrix(grid.matrix)