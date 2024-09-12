import { useTicTacToe } from "@/entities/ttt";
import { findWinner } from "@/entities/ttt/helpers/findWinner";
import { storeToRefs } from 'pinia';

export const useBoard = () => {
  const store = useTicTacToe()
  const {
    settings,
    makeTurn,
    $subscribe,
    endGame,
    startGame,
    idleGame,
  } = store

  const { status, board } = storeToRefs(store)

  const boardStyles = computed(() => ({
    gridTemplateColumns: `repeat(${settings?.boardSize}, 1fr`,
    gridTemplateRows: `repeat(${settings?.boardSize}, 1fr)`
  }))

  $subscribe((mutation, state) => {
    const boardIsNotMutated = mutation.type !== 'direct' || mutation.events.key !== 'currentMark'
    if (boardIsNotMutated) {
      return
    }

    const { board } = state
    if (!board || !settings) {
      return
    }

    const foundWInner = findWinner(board, settings.players)
    if (foundWInner) {
      endGame(foundWInner)
    }
  })

  const repeatClasses = computed(() => ({
    'opacity-0': status.value === 'inProgress',
    'opacity-100': status.value === 'finished',
  }))

  const repeat = () => {
    if (status.value !== 'finished') {
      throw new Error('Trying to repeat unfinished game')
    }

    if (!settings) {
      throw new Error('Trying to repeat game without settings')
    }

    startGame(settings)
  }

  const createAnotherGame = () => {
    idleGame()
  }

  return {
    board,
    repeatClasses,
    createAnotherGame,
    boardStyles,
    makeTurn,
    repeat
  }
}
