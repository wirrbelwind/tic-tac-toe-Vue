<script lang="ts" setup>
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '@/entities/ttt';

const model = defineModel('boardSize')

</script>

<template>
  <div>
    <input type="range" :min="MIN_BOARD_SIZE" :max="MAX_BOARD_SIZE" v-model="model" class="range" step="1" />
    <div class="flex w-full justify-between px-2 text-xs">
      <span v-for="n in MAX_BOARD_SIZE - MIN_BOARD_SIZE + 1" :key="n">{{ n + 2 }}</span>
    </div>
  </div>
</template>
