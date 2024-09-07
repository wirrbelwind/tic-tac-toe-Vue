import { defineStore } from 'pinia'
import { GameSettings, GameState, GameStatus } from './types'

export const useTicTacToe = defineStore(
  'tic-tac-toe',
  {
    state: (): GameState => ({
      status: 'idle',
      settings: null
    }),
    actions: {
      setSettings(newSettings: GameSettings) {
        this.settings = newSettings
      },
      setStatus(newStatus: GameStatus) {
        this.status = newStatus
      }
    },
  }
)
