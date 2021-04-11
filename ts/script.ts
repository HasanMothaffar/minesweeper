import {createBoard, revealTile, markTile, TILE_STATUSES} from './logic.js'

const BOARD_SIZE = 6, MINE_COUNT = 10

const board = createBoard(BOARD_SIZE, MINE_COUNT)

const boardElement = <HTMLElement> document.querySelector('.board')
const minesLeftText = <HTMLElement> document.querySelector('[data-mines-left]') 
minesLeftText.textContent = MINE_COUNT + ""

boardElement.style.setProperty("--size", BOARD_SIZE + "")

board.forEach(row => {
    row.forEach(tile => {
        boardElement?.append(tile.element)

        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameOver()
        })
        tile.element.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            markTile(tile)
            countMinesLeft()
        })
    })
})

const countMinesLeft = (): void => {
    const markedMines = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)

    minesLeftText.textContent =  MINE_COUNT - markedMines + ""
}

const checkGameOver = (): void => {
    const gameOver: boolean = board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE
        })
    })

    if (gameOver) {
        board.forEach(row => {
            row.forEach(tile => {
                if(tile.mine) {
                    tile.status = TILE_STATUSES.MINE
                }
            })
        })
    }
}