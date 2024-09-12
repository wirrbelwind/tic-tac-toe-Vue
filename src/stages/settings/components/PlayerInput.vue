<script lang="ts" setup>
const model = defineModel('input')
</script>

<template>
  <div class="flex">
    <label class="input input-bordered flex items-center gap-2">
      <input v-model="model" type="text" class="grow" placeholder="Player name" />
    </label>
  </div>
</template>
