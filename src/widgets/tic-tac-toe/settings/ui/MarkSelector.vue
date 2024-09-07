<script lang="ts" setup>
import { Mark, MarkIcon } from '@/entities/ttt';
import SwapIcon from '@/shared/assets/swap.svg';

interface Props {
  player1: Mark
  player2: Mark,
  randomizeMarks: boolean
}

const {
  player1,
  player2,
  randomizeMarks
} = defineProps<Props>()

const swapButtonClasses = computed(() => ({
  "cursor-pointer": !randomizeMarks,
  "tooltip tooltip-bottom": randomizeMarks,
  "cursor-not-allowed": randomizeMarks,
}))

const emit = defineEmits(['onSwap'])

</script>

<template>
  <div class="flex w-full justify-between ">
    <MarkIcon :mark="player1" width="50" height="50" />
    <button @click="emit('onSwap')" :disabled="randomizeMarks" data-tip="Randomizer enabled" :class="swapButtonClasses">

      <div>SWAP</div>
      <SwapIcon height="100" width="100" />
    </button>
    <MarkIcon :mark="player2" width="50" height="50" />
  </div>
</template>
