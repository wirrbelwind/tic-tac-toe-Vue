export type Mark = 'cross' | 'zero'

export interface Players {
  first: Player
  second: Player
}
export interface Player {
  name: string
  mark: Mark
}

export type GameStatus = 'idle' | 'inProgress' | 'finished'

export interface GameState {
  status: GameStatus
  settings: GameSettings | null
  board: Board | null
  currentMark: Mark | null
  errorList: string[]
  winner: Winner | null
}

export interface GameSettings {
  boardSize: number
  players: Players
}

export interface ValidationResult {
  errors: string[]
  isValidated: boolean
}

export type Board = BoardCell[][]

export type BoardCell = Mark | null

export interface Winner {
  winnerMark: Mark
  line: {
    type: 'row' | 'column' | 'diagonal'
    index: number
  }
}
