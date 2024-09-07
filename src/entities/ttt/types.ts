export type Mark = 'cross' | 'zero'

export interface Player {
  name: string
  mark: Mark
}

export type GameStatus = 'idle' | 'inProgress' | 'finished'

export interface GameState {
  status: GameStatus
  settings: GameSettings | null
}

export interface GameSettings {
  boardSize: number
  player1: Player
  player2: Player
}

export interface ValidationResult {
  errors: string[]
  isValidated: boolean
}
