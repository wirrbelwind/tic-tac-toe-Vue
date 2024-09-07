<script lang="ts" setup>
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE, useTicTacToe } from '@/entities/ttt';
const {
  settings,
  board
} = useTicTacToe()

const boardStyles = computed(() => ({
  gridTemplateColumns: `repeat(${settings?.boardSize}, minmax(0, 1fr))`
}))
console.log(board?.flat(1))
</script>

<template>
  <div class="grid gap-4" :style="boardStyles">
    <div v-for="cell in board?.flat(1)">
      {{ cell ? cell : 'empty' }}
    </div>
  </div>
</template>
