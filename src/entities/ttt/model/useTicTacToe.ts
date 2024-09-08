import { defineStore } from 'pinia'
import { BoardCell, GameSettings, GameState, GameStatus, Mark, Player } from '../types'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../constants'
import { validateSettings } from '../helpers/validateSettings'
import { swapMarks } from '../helpers/swapMarks'
import { tSMethodSignature } from '@babel/types'

export const useTicTacToe = defineStore(
  'tic-tac-toe',
  {
    state: (): GameState => ({
      status: 'idle',
      settings: null,
      board: null,
      currentMark: null,
      errorList: []
    }),
    actions: {
      startGame(
        newSettings: GameSettings,
        randomizeMarks: boolean,
        firstTurnMark: Mark = 'cross',
      ) {
        const { isValidated, errors } = validateSettings(newSettings)

        if (!isValidated) {
          this.errorList = errors
          return
        }

        const marksShouldBeSwapped = randomizeMarks && Math.random() > 0.5

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

        this.currentMark = firstTurnMark
        this.status = 'inProgress'
      },

      makeTurn(rowIndex: number, colIndex: number) {
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

    },
  }
)
