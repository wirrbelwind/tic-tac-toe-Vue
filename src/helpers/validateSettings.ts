import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from "@/constants"
import { GameSettings, ValidationResult } from "@/types"

export const validateSettings = (settings: GameSettings): ValidationResult => {
  const result: ValidationResult = {
    errors: [],
    isValidated: true
  }

  if (settings.boardSize < MIN_BOARD_SIZE) {
    result.errors.push('settings.boardSize < MIN_BOARD_SIZE')
    result.isValidated = false
  }

  if (settings.boardSize > MAX_BOARD_SIZE) {
    result.errors.push('settings.boardSize > MAX_BOARD_SIZE')
    result.isValidated = false
  }

  if (!settings.players.first.name) {
    result.errors.push('!settings.player1.name')
    result.isValidated = false
  }

  if (!settings.players.second.name) {
    result.errors.push('!settings.player2.name')
  }

  if (settings.players.first.name === settings.players.second.name) {
    result.errors.push('settings.player1.name === settings.player2.name')
    result.isValidated = false
  }

  if (settings.players.first.mark === settings.players.second.mark) {
    result.errors.push('settings.player1.mark === settings.player2.mark')
    result.isValidated = false
  }

  return result
}
