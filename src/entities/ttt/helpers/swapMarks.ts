import { Mark, Players } from "../types";

export const swapMarks = (players: Players) => {
  const playersCopy = structuredClone(players);

  [
    playersCopy.first.mark,
    playersCopy.second.mark
  ] = [
      playersCopy.second.mark,
      playersCopy.first.mark
    ]

  return playersCopy
}
