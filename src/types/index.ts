const aiStr = "ai"
const opponentStr = "opponent"

export type Player = typeof aiStr | typeof opponentStr
export type CellState = Player | "puttable" | undefined
export type BoardIndex = [number, number]
export type Score = {
  [aiStr]: number
  [opponentStr]: number
}

export type GameState = {
  boardState: CellState[][]
  nextPlayer: Player
}

export type AILevel = "強い" | "普通" | "弱い"

// JSON
export type JsonCellState = Exclude<CellState, undefined> | null
export type JsonGameState = {
  boardState: JsonCellState[][]
  nextPlayer: Player
}
export type JsonNode = {
  attemptNumber: number
  winNumber: number
  state: JsonGameState
  children: JsonNode[]
}
