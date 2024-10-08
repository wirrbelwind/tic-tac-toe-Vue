import { Players } from "@/types";

export const swapMarks = (players: Players) => {
  const playersCopy = { ...players };

  [
    playersCopy.first.mark,
    playersCopy.second.mark
  ] = [
      playersCopy.second.mark,
      playersCopy.first.mark
    ]

  return playersCopy
}
