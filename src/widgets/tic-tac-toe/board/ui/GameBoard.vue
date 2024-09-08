<script lang="ts" setup>
import { Mark, MAX_BOARD_SIZE, MIN_BOARD_SIZE, useTicTacToe } from '@/entities/ttt';
const {
  settings,
  board,
  currentMark,
  makeTurn,
} = useTicTacToe()

const boardStyles = computed(() => ({
  gridTemplateColumns: `repeat(${settings?.boardSize}, minmax(0, 10rem))`
}))

</script>

<template>

  <div class="grid gap-0" :style="boardStyles">
    <template v-for="row, i in board">
      <template :key="`${i}:${k}`" v-for="col, k in row">
        <button type="button" @click="makeTurn(i, k)" class="size-10  w-full h-40 shadow-inner shadow-lg">
          {{ col }}
        </button>
      </template>
    </template>
  </div>
</template>
