export type Player = "ai" | "opponent"
export type CellState = Player | undefined
export type BoardIndex = [number, number]

export type GameState = {
  boardState: CellState[][]
}
