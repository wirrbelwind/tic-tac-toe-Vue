<script setup lang="ts">
import { ref } from 'vue'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '@/entities/ttt/constants'
import { useTicTacToe } from '@/entities/ttt/useTicTacToe'
import { GameSettings } from '@/entities/ttt/types';
import MarkIcon from './MarkIcon.vue';
import DiceIcon from '@/shared/assets/dice.svg';
import SwapIcon from '@/shared/assets/swap.svg';
import { validateSettings } from '../../../../entities/ttt/ui/helpers/validateSettings';
import UserIcon from '@/shared/assets/user.svg'

const ttt = useTicTacToe()

const settings = ref<GameSettings>({
  boardSize: MIN_BOARD_SIZE,
  player1: {
    mark: 'cross',
    name: ''
  },
  player2: {
    mark: 'zero',
    name: ''
  },
})

const randomizeMarks = ref(false)
const errorList = ref<string[]>([])

const onStartGame = () => {
  errorList.value = []

  const { isValidated, errors } = validateSettings(settings.value)

  if (!isValidated) {
    errorList.value = errors
    return
  }

  if (randomizeMarks.value && Math.random() > 0.5) {
    onSwapMarks()
  }

  ttt.setSettings(settings.value)
  ttt.setStatus('inProgress')
}

const onSwapMarks = () => {
  [
    settings.value.player1.mark,
    settings.value.player2.mark
  ] = [
      settings.value.player2.mark,
      settings.value.player1.mark
    ]
}

const swapButtonClasses = computed(() => ({
  "cursor-pointer": !randomizeMarks.value,
  "tooltip tooltip-bottom": randomizeMarks.value,
  "cursor-not-allowed": randomizeMarks.value,
}))

</script>

<template>
  <div class="flex justify-center items-center h-[100dvh]">
    <div class="card bg-base-100 w-[50rem] shadow-xl">
      <div class="card-body">
        <p class="card-title">Create a game</p>
        <div>
          <input type="range" :min="MIN_BOARD_SIZE" :max="MAX_BOARD_SIZE" v-model="settings.boardSize" class="range"
            step="1" />
          <div class="flex w-full justify-between px-2 text-xs">
            <span v-for="n in MAX_BOARD_SIZE - MIN_BOARD_SIZE + 1" :key="n">{{ n + 2 }}</span>
          </div>
        </div>

        <div class="flex justify-between">
          <div class="flex">
            <label class="input input-bordered flex items-center gap-2">
              <UserIcon />
              <input v-model="settings.player1.name" type="text" class="grow" placeholder="Player 1" />
            </label>
          </div>
          <div class="flex">
            <label class="input input-bordered flex items-center gap-2">
              <UserIcon />

              <input v-model="settings.player2.name" type="text" class="grow" placeholder="Player 1" />
            </label>
          </div>
        </div>

        <div>
          <div>
            <div class="flex w-full justify-between ">
              <MarkIcon :mark="settings.player1.mark" width="50" height="50" />
              <button @click="onSwapMarks()" :disabled="randomizeMarks" data-tip="Randomizer enabled"
                :class="swapButtonClasses">

                <div>SWAP</div>
                <SwapIcon height="100" width="100" />
              </button>
              <MarkIcon :mark="settings.player2.mark" width="50" height="50" />
            </div>

            <div class="form-control">
              <label class="label cursor-pointer block">
                <DiceIcon width="100" height="100" :fill="randomizeMarks ? 'red' : 'black'" />
                <div class="label-text">Random</div>

                <input type="checkbox" v-model="randomizeMarks" class="hidden" />
              </label>
            </div>
          </div>
        </div>


        <div class="card-actions">
          <button @click="onStartGame" class="btn btn-primary w-full">
            SUBMIT
          </button>
        </div>

        <div v-if="errorList.length">
          <div v-for="error in errorList">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
