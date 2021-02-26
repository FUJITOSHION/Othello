import { useEffect, memo } from "react"
import { useDispatch } from "react-redux"
import dayjs from "dayjs"

import styles from "@styles/modules/BoardSurface.module.scss"
import type { BoardIndex, CellState, GameState } from "types"
import boardSlice from "@store/board"
import { Cell } from "./Cell"
import { range, includes } from "ramda"
import { validIndexes } from "../utils/game/board-index"
import { apply, checkFin } from "../utils/game/simulate"
import { useState } from "react"
import { MCTS } from "@utils/mcts"
import { CalcGameTime } from "./CalcGameTime"
import { VisualizeSituation } from "./VisualizeSituation"
import { RestartButton } from "./RestartButton"
import { SelectionCpuLevel } from "./SelectionCpuLevel"

const MIN_WAIT_TIME = 4000

type BoardSurfaceProps = {
  mcts: MCTS
}

const BoardSurfaceComp: React.FC<BoardSurfaceProps> = ({
  mcts,
}: BoardSurfaceProps) => {
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
  const [isAiTurn, setIsAiTurn] = useState<boolean>(false)
  const [aiStartTime, setAiStartTime] = useState<dayjs.Dayjs>(dayjs())
  const [cells, setCells] = useState<CellState[][]>(initCells)
  const [puttables, setPuttables] = useState<BoardIndex[]>([])
  const dispatch = useDispatch()

  const callback = (state: GameState): void => {
    console.log("AI終了")
    const diff = dayjs().diff(aiStartTime)
    const waitTime = diff > MIN_WAIT_TIME ? 0 : MIN_WAIT_TIME - diff

    setTimeout(() => {
      setIsAiTurn(false)
      setCells(state.boardState)
      const valids = validIndexes(state)
      setPuttables(valids)

      if (valids.length === 0 && mcts) {
        console.log("AI待ち...")

        mcts.getNextState(
          {
            boardState: state.boardState,
            nextPlayer: "ai",
          },
          callback
        )
      }
    }, waitTime)
  }

  useEffect(() => {
    const result = checkFin({
      boardState: cells,
      nextPlayer: isAiTurn ? "ai" : "opponent",
    })

    if (result.isFin) {
      console.log(result)
      dispatch(boardSlice.actions.setResult(result.score))
      dispatch(boardSlice.actions.setIsFin(true))
    }

    if (isAiTurn) {
      console.log("AI待ち...")
      setAiStartTime(dayjs())
      mcts.getNextState(
        {
          boardState: cells,
          nextPlayer: "ai",
        },
        callback
      )
    } else {
      setPuttables(
        validIndexes({
          boardState: cells,
          nextPlayer: "opponent",
        })
      )
    }
  }, [cells])

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <CalcGameTime />
      </div>

      <div className={styles.score}>
        <VisualizeSituation
          state={{ boardState: cells, nextPlayer: "opponent" }}
        />
      </div>

      <div className={styles.winner}></div>

      <div className={styles.left}>
        <a href="https://github.com/FUJITOSHION/Othello">Github</a>
      </div>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {cells.map((line, i) => (
            <div className={styles.boardRow} key={i}>
              {line.map((cell, j) => (
                <Cell
                  state={cell}
                  key={j}
                  onClick={async () => {
                    const nextState = apply(
                      { boardState: cells, nextPlayer: "opponent" },
                      [i, j]
                    )
                    setIsAiTurn(true)
                    setCells(nextState.boardState)
                    setPuttables([])
                  }}
                  isValid={includes([i, j], puttables)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <RestartButton />
        <SelectionCpuLevel />
      </div>

      <div className={styles.footer}>
        {isAiTurn ? "AIのターン" : "あなたのターン"}
      </div>
    </div>
  )
}

export const BoardSurface = memo(BoardSurfaceComp)
