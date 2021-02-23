const aiStr = "ai"
const opponentStr = "opponent"

export type Player = typeof aiStr | typeof opponentStr
export type CellState = Player | undefined
export type BoardIndex = [number, number]
export type Score = {
  [aiStr]: number
  [opponentStr]: number
}

export type GameState = {
  boardState: CellState[][]
  nextPlayer: Player
}
