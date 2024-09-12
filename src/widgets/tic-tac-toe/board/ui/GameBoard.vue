<script lang="ts" setup>
import { MarkIcon, useTicTacToe } from '@/entities/ttt';
import { findWinner } from '@/entities/ttt/helpers/findWinner';

import GameBanner from './GameBanner.vue';
import Cell from './Cell.vue';
import RepeatIcon from '@/shared/assets/repeat.svg'
import ArrowLeft from '@/shared/assets/arrow-left.svg'

import { storeToRefs } from 'pinia';
const store = useTicTacToe()
const {
  settings,
  makeTurn,
  $subscribe,
  endGame,
  startGame,
  idleGame,
} = store

const { status, board } = storeToRefs(store)

const boardStyles = computed(() => ({
  gridTemplateColumns: `repeat(${settings?.boardSize}, 1fr`,
  gridTemplateRows: `repeat(${settings?.boardSize}, 1fr)`
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
  if (foundWInner) {
    endGame(foundWInner)
  }
})

const repeatClasses = computed(() => ({
  'opacity-0': status.value === 'inProgress',
  'opacity-100': status.value === 'finished',
}))

const repeat = () => {
  if (status.value !== 'finished') {
    throw new Error('Trying to repeat unfinished game')
  }

  if (!settings) {
    throw new Error('Trying to repeat game without settings')
  }

  startGame(settings)
}

const createAnotherGame = () => {
  idleGame()
}

</script>

<template>
  <div>
    <GameBanner class="basis-[8rem]" />

    <div class="flex gap-10">
      <Transition name="fade">
        <button :class="repeatClasses" @click="createAnotherGame">
          <ArrowLeft width="7rem" height="7rem" />
        </button>
      </Transition>

      <div class=" justify-self-center grid border w-[100dvw] h-[100dvw] lg:w-[70dvh] lg:h-[70dvh] mt-10"
        :style="boardStyles">
        <template v-for="row, rowIndex in board">
          <template :key="`${i}:${k}`" v-for="_, colIndex in row">
            <Cell :cell="board[rowIndex][colIndex]" @on-turn="makeTurn" :row-index="rowIndex" :col-index="colIndex"
              class="" />
          </template>
        </template>
      </div>

      <Transition name="fade">
        <button :class="repeatClasses" @click="repeat">
          <RepeatIcon width="7rem" height="7rem" />
        </button>
      </Transition>
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
