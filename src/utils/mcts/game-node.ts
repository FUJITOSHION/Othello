import type { GameState } from "types"
import type { MctsConfig } from "./types"
import { validIndexes } from "@utils/game/board-index"
import { apply, checkFin } from "@utils/game/simulate"
import { getRandomInt } from "@utils/random"

export class GameNode {
  private attemptNumber: number
  private winNumber: number
  private state: GameState
  private children: GameNode[]

  constructor(state: GameState) {
    this.attemptNumber = 0
    this.winNumber = 0
    this.state = state
    this.children = []
  }

  select(config: MctsConfig): GameNode {
    // 子ノードから有効ノードを選択する
    if (this.isLeaf()) {
      throw Error("このノードは葉ノードです")
    }

    return this.children.reduce(
      (maxNode, currentNode) =>
        currentNode.uct(this, config) > maxNode.uct(this, config)
          ? currentNode
          : maxNode,
      this.children[0]
    )
  }

  expand(config: MctsConfig): void {
    if (this.isLeaf() && this.attemptNumber > config.expandThreshold) {
      // 試行数 > 敷地値のとき、拡張する
      // 有効な子ノード(次に取りうる選択肢すべて)を生成する

      this.children = validIndexes(this.state)
        .map((index) => apply(this.state, index))
        .map((state) => new GameNode(state))
    }
  }

  simulate(): boolean {
    let currentState: GameState = this.state
    let checkResult = checkFin(currentState)

    while (!checkResult.isFin) {
      const validMoves = validIndexes(this.state)
        .map((index) => apply(this.state, index))
        .map((state) => new GameNode(state))

      currentState = validMoves[getRandomInt(0, validMoves.length - 1)].state
      checkResult = checkFin(currentState)
    }

    return checkResult.winner === "ai"
  }

  reflectResult(isWin: boolean): void {
    this.attemptNumber += 1
    this.winNumber += isWin ? 1 : 0
  }

  isLeaf(): boolean {
    return this.children.length === 0
  }

  uct(parentNode: GameNode, config: MctsConfig): number {
    return this.reward() + this.attemptNumber !== 0
      ? (2 * config.CP * Math.sqrt(2 * Math.log(parentNode.attemptNumber))) /
          this.attemptNumber
      : 99999999
  }

  reward(): number {
    return this.winNumber / this.attemptNumber
  }

  getBestChildNode(): GameNode {
    return this.children.reduce(
      (s, t) => (s.reward() > t.reward() ? s : t),
      this.children[0]
    )
  }

  getState(): GameState {
    return this.state
  }
}