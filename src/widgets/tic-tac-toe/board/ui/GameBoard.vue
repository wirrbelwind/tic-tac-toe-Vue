<script lang="ts" setup>
import { useTicTacToe, MarkIcon } from '@/entities/ttt';
import { findWinner } from '@/entities/ttt/helpers/findWinner';

import { storeToRefs } from 'pinia';
const store = useTicTacToe()
const {
  settings,
  board,
  makeTurn,
  $subscribe,
  endGame,
} = store
const { winner, currentMark } = storeToRefs(store)

const boardStyles = computed(() => ({
  gridTemplateColumns: `repeat(${settings?.boardSize}, minmax(0, 10rem))`
}))

$subscribe((mutation, state) => {
  const boardIsNotMutated = mutation.type !== 'direct' || mutation.events.key !== 'currentMark'
  if (boardIsNotMutated) {
    return
  }

  const { board } = state
  if (!board || !settings) {
    return
  }

  const foundWInner = findWinner(board, settings.players)
  console.log(foundWInner)
  if (foundWInner) {
    endGame(foundWInner)
  }
})

</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="basis-80 shrink-0"></div>
    <div v-if="currentMark && !winner" class="flex gap-2 items-center justify-center">
      <Transition name="fade">
        <MarkIcon :mark="currentMark" width="50" height="50" />
      </Transition>

      <p class="text-4xl">'s turn</p>
    </div>

    <Transition name="fade">
      <div v-if="winner">
        <p>{{ JSON.stringify(winner) }}</p>
      </div>
    </Transition>

    <div class="grid gap-0" :style="boardStyles">
      <template v-for="row, i in board">
        <template :key="`${i}:${k}`" v-for="col, k in row">
          <button type="button" @click="makeTurn(i, k)"
            class="size-10  w-full h-40 shadow-inner shadow-xl flex justify-center items-center">
            <MarkIcon v-if="board[i][k]" :mark="board[i][k]" width="5rem" height="5rem" />
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
