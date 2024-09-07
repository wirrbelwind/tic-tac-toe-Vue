<script setup lang="ts">
import { useTicTacToe } from '@/entities/ttt/useTicTacToe'
import { GameStatus } from '@/entities/ttt/types'
import GameSettings from '@/entities/ttt/ui/GameSettings.vue';
import GameBoard from '@/entities/ttt/ui/GameBoard.vue';
import GameResults from '@/entities/ttt/ui/GameResults.vue';

const ttt = useTicTacToe()

const gameSteps: Record<GameStatus, any> = {
  idle: GameSettings,
  inProgress: GameBoard,
  finished: GameResults,
}

</script>

<template>
  <div class="cursor d-flex align-center justify-center h-screen">
    <component :is="gameSteps[ttt.status]" />
  </div>
</template>
