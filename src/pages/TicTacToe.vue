<script setup lang="ts">
import { GameStatus, useTicTacToe } from '@/entities/ttt';
import { GameBoard } from '@/widgets/tic-tac-toe/board';
import { GameResults } from '@/widgets/tic-tac-toe/result';
import { GameSettings } from '@/widgets/tic-tac-toe/settings';
import type { Component } from 'vue';


const ttt = useTicTacToe()

const gameSteps: Record<GameStatus, Component> = {
  idle: GameSettings,
  inProgress: GameBoard,
  finished: GameBoard,
}
</script>

<template>
  <div class="flex items-center h-[100dvh] justify-center">
    <component :is="gameSteps[ttt.status]" />
  </div>
</template>
