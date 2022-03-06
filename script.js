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
    if (count < 9) {
        cell.style.backgroundColor = `rgba(0,0,0,0.${count})`
        cell.setAttribute('data-count', `${count}`)
    }
}

function displayMatrix(m) {
    let container = document.createElement('div')
    container.classList.add('matrix', 'parent')
    container.style.setProperty('--grid-rows', grid.rows)
    container.style.setProperty('--grid-cols', grid.cols)

    // let clearMatrixBtn = document.createElement('button')
    // clearMatrixBtn.innerText = "Clear"

    // clearMatrixBtn.addEventListener('click', () => {
    //     displayMatrix(grid.matrix)
    // })
    
    m.forEach(el => {
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
    displayGrid.appendChild(clearMatrixBtn)
}

grid.matrix = makeGrid()

displayMatrix(grid.matrix)