<script lang="ts" setup>
import DiceIcon from '@/shared/assets/dice.svg';

const model = defineModel<boolean>('randomizer')
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer block">
      <DiceIcon width="100" height="100" :fill="model ? 'red' : 'black'" />
      <div class="label-text">Random</div>

      <input type="checkbox" v-model="model" class="hidden" />
    </label>
  </div>
</template>
