import { GameSettings, MIN_BOARD_SIZE, useTicTacToe } from "@/entities/ttt"
import { swapMarks } from "@/entities/ttt/helpers/swapMarks"
import { storeToRefs } from "pinia"

export const useSettings = () => {

  const store = useTicTacToe()
  const { startGame } = store

  const {
    errorList
  } = storeToRefs(store)

  const settings = ref<GameSettings>({
    boardSize: MIN_BOARD_SIZE,
    firstTurnMark: 'cross',
    randomizeMarks: false,
    players: {
      first: {
        mark: 'cross',
        name: 'Player 1'
      },
      second: {
        mark: 'zero',
        name: 'Player 2'
      }
    }
  })

  const onSubmit = () => {
    startGame(settings.value)
  }

  const onSwapMarks = () => {
    settings.value.players = swapMarks(settings.value.players)
  }

  return {
    settings,
    onSwapMarks,
    onSubmit
  }
}
