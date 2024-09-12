<script lang="ts" setup>
import type { Mark } from '@/types'
import SwapIcon from '@/assets/swap.svg'

const {
  player1,
  player2,
  randomizeMarks
} = defineProps<{
  player1: Mark
  player2: Mark,
  randomizeMarks: boolean
}>()

const swapButtonClasses = computed(() => ({
  "cursor-pointer": !randomizeMarks,
  "tooltip tooltip-bottom": randomizeMarks,
  "cursor-not-allowed": randomizeMarks,
}))

const emit = defineEmits(['onSwap'])

</script>

<template>
  <div class="flex w-full justify-between ">
    <Transition name="fade">
      <MarkIcon :mark="player1" width="50" height="50" />
    </Transition>
    <button @click="emit('onSwap')" :disabled="randomizeMarks" data-tip="Randomizer enabled" :class="swapButtonClasses"
      class="">

      <SwapIcon height="100" width="100" class="fill-orange-400 active:fill-orange-600" />
      <p class="text-xl">Swap</p>

    </button>

    <Transition name="fade">
      <MarkIcon :mark="player2" width="50" height="50" />
    </Transition>
  </div>
</template>
