<script lang="ts" setup>
import MarkIcon from '@/components/MarkIcon.vue';
import { BoardCell } from '@/types';

const {
  cell,
  colIndex,
  rowIndex
} = defineProps<{
  cell: BoardCell
  rowIndex: number
  colIndex: number
}>()

const emit = defineEmits(['onTurn'])

</script>

<template>
  <button type="button" @click="emit('onTurn', rowIndex, colIndex)"
    class="size-10 w-full h-full shadow-inner shadow-md shadow-orange-800 flex justify-center items-center">
    <Transition name="fade">
      <MarkIcon v-if="cell" :mark="cell" width="5rem" height="5rem" />
    </Transition>
  </button>
</template>
