<script setup lang="ts">
import { ref } from 'vue'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '@/entities/ttt/constants'
import { useTicTacToe } from '@/entities/ttt/useTicTacToe'
import { GameSettings } from '@/entities/ttt/types';

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

const onStartGame = () => {
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input v-model="settings.player1.name" type="text" class="grow" placeholder="Player 1" />
            </label>
          </div>
          <div class="flex">
            <label class="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input v-model="settings.player2.name" type="text" class="grow" placeholder="Player 1" />
            </label>
          </div>
        </div>

        <div>
          <div>
            <div class="flex w-full justify-between ">
              <div>
                {{ settings.player1.mark }}
              </div>

              <button @click="onSwapMarks()">SWITCH</button>

              <div>
                {{ settings.player2.mark }}
              </div>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal gap-2">
                <span class="label-text">Random</span>
                <input type="checkbox" v-model="randomizeMarks" class="checkbox" />
              </label>
            </div>
          </div>

        </div>


        <div class="card-actions">
          <button @click="onStartGame" class="btn btn-primary w-full">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
