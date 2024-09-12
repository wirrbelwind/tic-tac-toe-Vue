<script lang="ts" setup>

import Banner from './Banner.vue';
import Cell from './Cell.vue';
import RepeatIcon from '@/assets/repeat.svg'
import ArrowLeft from '@/assets/arrow-left.svg'
import { useBoard } from '@/hooks/useBoard';

const {
  board,
  repeatClasses,
  createAnotherGame,
  boardStyles,
  makeTurn,
  repeat
} = useBoard()

</script>

<template>
  <div>
    <Banner class="basis-[8rem]" />

    <div class="flex gap-10">
      <Transition name="fade">
        <button :class="repeatClasses" @click="createAnotherGame">
          <ArrowLeft width="7rem" height="7rem" />
        </button>
      </Transition>

      <div v-if="board" class=" justify-self-center grid border w-[100dvw] h-[100dvw] lg:w-[70dvh] lg:h-[70dvh] mt-10"
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
