import { memo, useEffect } from "react"
import { useDispatch } from "react-redux"
import dayjs from "dayjs"

import styles from "@styles/modules/Game.module.scss"
import type { GameState, BoardIndex } from "types"
import boardSlice from "@store/board"
import { apply, checkFin } from "../utils/game/simulate"
import { applyIsValid } from "@utils/game/check"
import { useState } from "react"
import { MCTS } from "@utils/mcts"
import { CalcGameTime } from "./CalcGameTime"
import { BoardSurface } from "./BoardSurface"
import { VisualizeSituation } from "./VisualizeSituation"
import { RestartButton } from "./RestartButton"
import { MctsConfig } from "@utils/mcts/types"

const MIN_WAIT_TIME = 2000

type GameProps = {
  mcts: MCTS
  conf: (count: number) => MctsConfig
}

const BaseGame: React.FC<GameProps> = ({ mcts, conf }: GameProps) => {
  const [count, setCount] = useState(0)
  const [aiStartTime, setAiStartTime] = useState<dayjs.Dayjs>(dayjs())
  const [gameState, setGameState] = useState<GameState>(
    mcts.tree.getRootNode().getState()
  )
  const dispatch = useDispatch()

  const handleCellClick = (index: BoardIndex) => {
    if (gameState.nextPlayer === "ai") {
      console.log("おかしいよ")
    }
    const nextState = applyIsValid(apply(gameState, index))
    console.log("プレイヤーの行動: ", gameState, index, nextState)
    dispatch(boardSlice.actions.setIsAiTurn(true))
    setGameState(nextState)
    setAiStartTime(dayjs())
  }

  useEffect(() => {
    const result = checkFin(gameState)

    if (result.isFin) {
      dispatch(boardSlice.actions.setResult(result.score))
      dispatch(boardSlice.actions.setIsFin(true))
    }

    setCount(count + 1)
    mcts.updateConfig(conf(count))

    if (gameState.nextPlayer === "ai") {
      setAiStartTime(dayjs())
      setTimeout(() => {
        console.log("AI待ち...")
        mcts.getNextState(gameState, callback)
      }, 0)
    }
  }, [gameState])

  const callback = (state: GameState): void => {
    const diff = dayjs().diff(aiStartTime)
    const waitTime = diff > MIN_WAIT_TIME ? 0 : MIN_WAIT_TIME - diff

    setTimeout(() => {
      dispatch(boardSlice.actions.setIsAiTurn(false))
      setGameState(state)
      console.log("AIの行動: ", state)

      if (
        gameState.boardState.flat().filter((cell) => cell === "puttable")
          .length === 0
      ) {
        console.log("AI待ち...")

        mcts.getNextState(applyIsValid(state), callback)
      }
    }, waitTime)
  }

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <CalcGameTime />
      </div>

      <div className={styles.score}>
        <VisualizeSituation state={gameState} />
      </div>

      <div className={styles.winner}></div>

      <div className={styles.left}>
        <a href="https://github.com/FUJITOSHION/Othello">Github</a>
      </div>

      <div className={styles.boardWrapper}>
        <BoardSurface
          cells={gameState.boardState}
          handleCellClick={handleCellClick}
        />
      </div>

      <div className={styles.right}>
        <RestartButton />
      </div>

      <div className={styles.footer}>
        {gameState.nextPlayer === "ai" ? "AIのターン" : "あなたのターン"}
      </div>
    </div>
  )
}

export const Game = memo(BaseGame)
