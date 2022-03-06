let grid = {
    cols: 16,
    rows: 16,
    matrix: []
}

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

function displayMatrix(m) {
    let container = document.createElement('div')
    container.classList.add('matrix', 'parent')

    m.map(el => {
        console.log(el)
    })
}

grid.matrix = makeGrid()
displayMatrix(grid.matrix)