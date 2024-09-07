import { defineStore } from 'pinia'
import { GameSettings, GameState, GameStatus } from '../types'

export const useTicTacToe = defineStore(
  'tic-tac-toe',
  {
    state: (): GameState => ({
      status: 'idle',
      settings: null,
      board: null,
    }),
    actions: {
      setSettings(newSettings: GameSettings) {
        this.settings = newSettings
      },
      setStatus(newStatus: GameStatus) {
        this.status = newStatus
      },
      initBoard() {
        if (this.settings) {
          this.board = Array(this.settings.boardSize)
            .fill(Array(this.settings.boardSize)
              .fill(null))
        }
      }
    },
  }
)
