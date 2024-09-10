import { Mark, Players } from "../types";


export const findPlayerByMark = (players: Players, mark: Mark): keyof Players => {
  if (players.first.mark === mark) {
    return 'first'
  }

  if (players.second.mark === mark) {
    return 'second'
  }

  throw new Error(`Player with mark ${mark} not found`)
}
