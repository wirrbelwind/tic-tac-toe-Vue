<script lang="ts" setup>
import DiceIcon from '@/shared/assets/dice.svg';

const model = defineModel<boolean>('randomizer')

const iconClasses = computed(() => ({
  "fill-orange-600": model.value
}))
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer block">
      <DiceIcon width="100" height="100" :class="iconClasses" />
      <p class="text-xl">Random marks</p>

      <input type="checkbox" v-model="model" class="hidden" />
    </label>
  </div>
</template>
