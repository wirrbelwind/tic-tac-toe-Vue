import { Board, Mark, Winner } from "../types"

export const getWinner = (board: Board): Winner | null => {
  const size = board.length
  let lowDiagonalWinPossible = true
  let highDiagonalWinPossible = true
  const firstLowDiagonalMark = board[0][0]
  const firstHighDiagonalMark = board[0][size - 1]

  for (let i = 0; i < size; i++) {
    // Horizontal winner
    if (board[i][0]) {
      const firstCellMark = board[i][0] as Mark
      let isWinner = true
      for (let j = 1; j < size; j++) {
        if (board[i][j] !== firstCellMark) {
          isWinner = false
          break
        }
      }
      if (isWinner) {
        return {
          winnerMark: firstCellMark,
          line: { type: 'row', index: i }
        }
      }
    }

    // Verticle winner
    if (board[0][i]) {
      const firstCellMark = board[0][i] as Mark
      let isWinner = true
      for (let j = 1; j < size; j++) {
        if (board[j][i] !== firstCellMark) {
          isWinner = false
          break
        }
      }
      if (isWinner) {
        return {
          winnerMark: firstCellMark,
          line: { type: 'column', index: i }
        }
      }
    }

    // Diagonal (left top -> right bottom)
    if (lowDiagonalWinPossible && board[i][i] !== firstLowDiagonalMark) {
      lowDiagonalWinPossible = false
    }

    // Diagonal (right top -> left bottom)
    if (highDiagonalWinPossible && board[i][size - 1 - i] !== firstHighDiagonalMark) {
      highDiagonalWinPossible = false
    }
  }

  if (lowDiagonalWinPossible && firstLowDiagonalMark !== null) {
    return {
      winnerMark: firstLowDiagonalMark as Mark,
      line: { type: 'diagonal', index: 0 }
    }
  }

  if (highDiagonalWinPossible && firstHighDiagonalMark !== null) {
    return {
      winnerMark: firstHighDiagonalMark as Mark,
      line: { type: 'diagonal', index: 1 }
    }
  }

  return null
}
