<script setup lang="ts">
import PlayerInput from './PlayerInput.vue';
import BoardSizeSelector from './BoardSizeSelector.vue';
import RandomizerCheckbox from './RandomizerCheckbox.vue';
import MarkSelector from './MarkSelector.vue';
import ErrorList from './ErrorList.vue';
import { useSettings } from '../model/useSettings';

const {
  settings,
  onSwapMarks,
  onSubmit
} = useSettings()
</script>

<template>
  <div class="card bg-base-100 w-[50rem] shadow-xl">
    <div class="card-body">
      <p class="card-title">Create a game</p>
      <BoardSizeSelector v-model:board-size="settings.boardSize" />

      <div class="flex justify-between">
        <PlayerInput v-model:input="settings.players.first.name" />
        <PlayerInput v-model:input="settings.players.second.name" />
      </div>

      <div>
        <div>
          <MarkSelector :player1="settings.players.first.mark" :player2="settings.players.second.mark"
            @on-swap="onSwapMarks()" :randomize-marks="settings.randomizeMarks" />
          <RandomizerCheckbox v-model:randomizer="settings.randomizeMarks" />
        </div>
      </div>


      <div class="card-actions">
        <button type="submit" @click.prevent="onSubmit"
          class="btn w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-xl">
          SUBMIT
        </button>
      </div>

      <ErrorList />
    </div>
  </div>
</template>
