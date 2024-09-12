import { swapMarks } from "@/helpers/swapMarks"
import { useStore } from "./useStore"
import { GameSettings } from "@/types"
import { MIN_BOARD_SIZE } from "@/constants"

export const useSettings = () => {

  const store = useStore()
  const { startGame } = store

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
    onSubmit,
  }
}
