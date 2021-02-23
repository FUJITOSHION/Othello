import { Cell } from "./Cell"
import { CellState } from "../../src/types/index"
import { range, includes } from "ramda"
import { validIndexes } from "../utils/game/board-index"
import { apply } from "../utils/game/simulate"
import { useState } from "react"

export const BoardSurface: React.FC = () => {
  const isAiWhite = true

  const cells: CellState[][] = range(0, 10).map(() =>
    range(0, 10).map(() => undefined)
  )
  if (isAiWhite) {
    cells[4][4] = "ai"
    cells[4][5] = "opponent"
    cells[5][5] = "ai"
    cells[5][4] = "opponent"
  } else {
    cells[4][4] = "opponent"
    cells[4][5] = "ai"
    cells[5][5] = "opponent"
    cells[5][4] = "ai"
  }
  const [updateCells, setUpdateCells] = useState<CellState[][]>(cells)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {updateCells.map((line, i) => (
        <div style={{ display: "flex", flexDirection: "row" }} key={i}>
          {line.map((cell, j) => (
            <Cell
              state={cell}
              key={j}
              onClick={() =>
                setUpdateCells(
                  apply({ boardState: cells, nextPlayer: "opponent" }, [i, j])
                    .boardState
                )
              }
              isValid={includes(
                [i, j],
                validIndexes({
                  boardState: updateCells,
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
