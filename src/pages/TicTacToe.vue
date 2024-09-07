<script setup lang="ts">
  import GameSettings from '@/components/GameSettings.vue'
  import GameBoard from '@/components/GameBoard.vue'
  import GameResults from '@/components/GameResults.vue'
  import { useTicTacToe } from '@/entities/ttt/useTicTacToe'
  import { GameStatus } from '@/entities/ttt/types'

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
