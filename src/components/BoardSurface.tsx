import { Cell } from "./Cell"
import { CellState } from "../../src/types/index"
import { range, includes } from "ramda"
import { validIndexes } from "../utils/game/board-index"
import { apply } from "../utils/game/simulate"
import { useState } from "react"

export const BoardSurface: React.FC = () => {
  const isAiWhite = true

  const initCells: CellState[][] = range(0, 10).map(() =>
    range(0, 10).map(() => undefined)
  )
  if (isAiWhite) {
    initCells[4][4] = "ai"
    initCells[4][5] = "opponent"
    initCells[5][5] = "ai"
    initCells[5][4] = "opponent"
  } else {
    initCells[4][4] = "opponent"
    initCells[4][5] = "ai"
    initCells[5][5] = "opponent"
    initCells[5][4] = "ai"
  }
  const [cells, setCells] = useState<CellState[][]>(initCells)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {cells.map((line, i) => (
        <div style={{ display: "flex", flexDirection: "row" }} key={i}>
          {line.map((cell, j) => (
            <Cell
              state={cell}
              key={j}
              onClick={() =>
                setCells(
                  apply({ boardState: cells, nextPlayer: "opponent" }, [i, j])
                    .boardState
                )
              }
              isValid={includes(
                [i, j],
                validIndexes({
                  boardState: cells,
                  nextPlayer: "opponent",
                })
              )}
            />
          ))}
        </div>
      ))}
      <p>hello</p>
    </div>
  )
}
