<script setup lang="ts">
import { GameStatus } from '@/types';
import './tailwind.css'
import type { Component } from 'vue';
import { useStore } from '@/hooks/useStore';
import { Settings } from '@/stages/settings';
import { Board } from '@/stages/board';

const ttt = useStore()

const gameSteps: Record<GameStatus, Component> = {
  idle: Settings,
  inProgress: Board,
  finished: Board,
}
</script>

<template>
  <div class="flex items-center h-[100dvh] justify-center">
    <component :is="gameSteps[ttt.status]" />
  </div>
</template>
