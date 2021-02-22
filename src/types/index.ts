// 仮置き
export type BoardState = "ai" | "opponent" | undefined

export type GameState = {
  boardState: BoardState[][]
}
