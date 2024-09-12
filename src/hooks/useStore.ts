import { defineStore } from 'pinia'
import { BoardCell, GameSettings, GameState, Winner } from '@/types'
import { validateSettings } from '@/helpers/validateSettings'
import { swapMarks } from '@/helpers/swapMarks'

export const useStore = defineStore(
  'tic-tac-toe',
  {
    state: (): GameState => ({
      status: 'idle',
      settings: null,
      board: null,
      currentMark: null,
      errorList: [],
      winner: null,
    }),

    actions: {
      startGame(
        newSettings: GameSettings,
      ) {
        const { isValidated, errors } = validateSettings(newSettings)

        if (!isValidated) {
          this.errorList = errors
          return
        }

        const marksShouldBeSwapped = newSettings.randomizeMarks && Math.random() > 0.5

        if (marksShouldBeSwapped) {
          newSettings.players = swapMarks(newSettings.players)
        }

        this.settings = newSettings

        const newBoard: BoardCell[][] = []
        for (let i = 0; i < this.settings.boardSize; i++) {
          newBoard[i] = []
          for (let k = 0; k < this.settings.boardSize; k++) {
            newBoard[i][k] = null
          }
        }
        this.board = newBoard

        this.currentMark = newSettings.firstTurnMark
        this.winner = null
        this.status = 'inProgress'
      },

      makeTurn(rowIndex: number, colIndex: number) {
        if (this.status !== 'inProgress') {
          return
        }

        if (!this.board && !this.currentMark) {
          return
        }

        // Make a turn
        const isTouchedCell = this.board![rowIndex][colIndex] !== null
        if (isTouchedCell) {
          return
        }

        this.board![rowIndex][colIndex] = this.currentMark

        // Toggle current mark
        if (this.currentMark === 'cross') {
          this.currentMark = 'zero'
        }
        else {
          this.currentMark = 'cross'
        }
      },

      endGame(winner: Winner) {
        this.winner = winner
        this.status = 'finished'
      },
      idleGame() {
        this.status = 'idle'
      }
    },

  }
)
