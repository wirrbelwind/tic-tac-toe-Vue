<script lang="ts" setup>
import { useTicTacToe } from '@/entities/ttt';
  const ttt = useTicTacToe()
</script>

<template>
  board
  {{ JSON.stringify(ttt.board) }}
</template>
