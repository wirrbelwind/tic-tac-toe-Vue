<script setup lang="ts">
import { ref } from 'vue'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '@/entities/ttt/constants'
import { GameSettings } from '@/entities/ttt/types';
import { MarkIcon, useTicTacToe, validateSettings } from '@/entities/ttt';
import PlayerInput from './PlayerInput.vue';
import BoardSizeSelector from './BoardSizeSelector.vue';
import RandomizerCheckbox from './RandomizerCheckbox.vue';
import MarkSelector from './MarkSelector.vue';

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
  ttt.initBoard()
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



</script>

<template>
  <div class="flex justify-center items-center h-[100dvh]">
    <div class="card bg-base-100 w-[50rem] shadow-xl">
      <div class="card-body">
        <p class="card-title">Create a game</p>
        <BoardSizeSelector v-model:board-size="settings.boardSize" />

        <div class="flex justify-between">
          <PlayerInput v-model:input="settings.player1.name" />
          <PlayerInput v-model:input="settings.player2.name" />
        </div>

        <div>
          <div>

            <MarkSelector :player1="settings.player1.mark" :player2="settings.player2.mark" @on-swap="onSwapMarks()"
              :randomize-marks="randomizeMarks" />
            <RandomizerCheckbox v-model:randomizer="randomizeMarks" />
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
