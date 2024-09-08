<script lang="ts" setup>
import { Mark, MAX_BOARD_SIZE, MIN_BOARD_SIZE, useTicTacToe, MarkIcon } from '@/entities/ttt';
const {
  settings,
  board,
  currentMark,
  makeTurn,
  $subscribe
} = useTicTacToe()

const winnerState = ref('NO ONE')

const boardStyles = computed(() => ({
  gridTemplateColumns: `repeat(${settings?.boardSize}, minmax(0, 10rem))`
}))

$subscribe((mutation, state) => {
  const { board } = state
  if (!board) {
    return
  }

  // diagonal to low
  const isLowDiagonalWinPossible = board[0][0] !== null
  if (isLowDiagonalWinPossible) {
    const firstCellMark = board[0][0] as Mark
    let isWinner = true

    for (let position = 0; position < board.length; position++) {
      if (board[position][position] !== firstCellMark) {
        isWinner = false
        break
      }
    }
    if (isWinner) {
      winnerState.value = firstCellMark
      return
    }
  }

  // diagonal to up
  const isHighDiagonalWinPossible = board[0][board.length - 1] !== null
  if (isHighDiagonalWinPossible) {
    const firstCellMark = board[0][board.length - 1] as Mark
    let isWinner = true

    for (let position = 0; position < board.length; position++) {
      if (board[position][board.length - 1 - position] !== firstCellMark) {
        isWinner = false
        break
      }
    }

    if (isWinner) {
      winnerState.value = firstCellMark
      return
    }
  }


  // horizontal
  for (let row = 0; row < board.length; row++) {
    if (!board[row][0]) {
      continue
    }

    const firstCellMark = board[row][0] as Mark
    let isWinner = true

    for (let col = 1; col < board.length; col++) {
      if (board[row][col] !== firstCellMark) {
        isWinner = false
        break
      }
    }

    if (isWinner) {
      winnerState.value = firstCellMark
      return
    }
  }

  // vertical
  for (let col = 0; col < board.length; col++) {
    if (!board[0][col]) {
      continue
    }

    const firstCellMark = board[0][col] as Mark
    let isWinner = true

    for (let row = 1; row < board.length; row++) {
      if (board[row][col] !== firstCellMark) {
        isWinner = false
        break
      }
    }

    if (isWinner) {
      winnerState.value = firstCellMark
      return
    }
  }
})

</script>

<template>
  {{ winnerState }}
  <div class="grid gap-0" :style="boardStyles">
    <template v-for="row, i in board">
      <template :key="`${i}:${k}`" v-for="col, k in row">
        <button type="button" @click="makeTurn(i, k)"
          class="size-10  w-full h-40 shadow-inner shadow-lg flex justify-center items-center">
          <MarkIcon v-if="board[i][k]" :mark="board[i][k]" width="5rem" height="5rem" />
        </button>
      </template>
    </template>
  </div>
</template>
