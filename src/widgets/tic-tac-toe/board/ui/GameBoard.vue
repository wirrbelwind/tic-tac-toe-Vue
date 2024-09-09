<script lang="ts" setup>
import { Mark, MAX_BOARD_SIZE, MIN_BOARD_SIZE, useTicTacToe, MarkIcon } from '@/entities/ttt';
import { getWinner } from '@/entities/ttt/helpers/getWinner';
import { storeToRefs } from 'pinia';
const store = useTicTacToe()
const {
  settings,
  board,
  currentMark,
  makeTurn,
  $subscribe,
  endGame,
} = store
const { winner } = storeToRefs(store)

console.log('winner updated', winner)
const boardStyles = computed(() => ({
  gridTemplateColumns: `repeat(${settings?.boardSize}, minmax(0, 10rem))`
}))

$subscribe((mutation, state) => {
  if (mutation.type !== 'direct' || mutation.events.key !== 'currentMark') {
    return
  }

  const { board } = state
  if (!board) {
    return
  }

  const winner = getWinner(board)
  console.log(winner)
  if (winner) {
    console.log('set winner')
    1
    endGame(winner)
  }
})



</script>

<template>
  <div v-if="winner">{{ JSON.stringify(winner) }}</div>
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
