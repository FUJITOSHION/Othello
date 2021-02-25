import { useEffect } from "react"

import type { BoardIndex, CellState, GameState } from "types"
import { Cell } from "./Cell"
import { range, includes } from "ramda"
import { validIndexes } from "../utils/game/board-index"
import { apply } from "../utils/game/simulate"
import { useState } from "react"
import { MCTS } from "@utils/mcts"
import { CalcGameTime } from "./CalcGameTime"
import { PutStones } from "./PutStones"
import { RestartButton } from "./RestartButton"
import { SelectionCpuLevel } from "./SelectionCpuLevel"

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
  const [puttables, setPuttables] = useState<BoardIndex[]>([])

  const config = {
    expandThreshold: 10,
    CP: 1 / Math.sqrt(2),
    stepNumber: 30,
  }

  let Mcts: MCTS | undefined

  useEffect(() => {
    setPuttables(
      validIndexes({
        boardState: cells,
        nextPlayer: "opponent",
      })
    )
  }, [])

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
              onClick={() => {
                const nextState = apply(
                  { boardState: cells, nextPlayer: "opponent" },
                  [i, j]
                )
                setCells(nextState.boardState)
                setPuttables([])

                console.log("AI待ち...")
                const callback = (state: GameState): void => {
                  console.log("AI終了")

                  setCells(state.boardState)
                  const valids = validIndexes(state)
                  setPuttables(valids)

                  if (valids.length === 0 && Mcts) {
                    Mcts.getNextState(
                      {
                        boardState: state.boardState,
                        nextPlayer: "ai",
                      },
                      callback
                    )
                  }
                }

                if (!Mcts) {
                  Mcts = new MCTS(config, nextState)
                  Mcts.getNextStateFirst(callback)
                } else {
                  Mcts.getNextState(nextState, callback)
                }
              }}
              isValid={includes([i, j], puttables)}
            />
          ))}
        </div>
      ))}
      <CalcGameTime />
      <PutStones state={{ boardState: cells, nextPlayer: "opponent" }} />
      <RestartButton />
      <SelectionCpuLevel />
      <a href="https://github.com/FUJITOSHION/Othello">github</a>
    </div>
  )
}
