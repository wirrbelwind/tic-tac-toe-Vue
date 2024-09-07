import { defineStore } from 'pinia'
import { GameSettings, GameState } from './types'

export const useTicTacToe = defineStore(
  'tic-tac-toe',
  {
    state: (): GameState => ({
      status: 'idle',
      settings: null
    }),
    actions: {
      startGame(newSettings: GameSettings) {
        this.settings = newSettings
        this.status = 'inProgress'
      },

      endGame() {
        this.status = 'finished'
      }
    },
  }
)
