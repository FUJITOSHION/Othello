import type { GameState, JsonNode } from "types"
import type { MctsConfig } from "./types"
import { validIndexes } from "@utils/game/board-index"
import { apply, checkFin } from "@utils/game/simulate"
import { getRandomInt } from "@utils/random"
import { NUMCELLS } from "../game/index"

export class GameNode {
  private attemptNumber: number
  private winNumber: number
  private state: GameState
  private children: GameNode[]

  constructor(state: GameState, isRoot = false) {
    this.attemptNumber = 0
    this.winNumber = 0
    this.state = state
    this.children = []
    if (isRoot) this.setChildren()
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

      this.children = this.possibleChildNodes()
    }
  }

  simulate(): boolean {
    let currentState: GameState = this.state
    let checkResult = checkFin(currentState)

    while (!checkResult.isFin) {
      const validMoves = new GameNode(currentState).possibleChildNodes()
      if (validMoves.length === 0) {
        currentState = {
          boardState: currentState.boardState,
          nextPlayer: currentState.nextPlayer === "ai" ? "opponent" : "ai",
        }
        checkResult = checkFin(currentState)
        continue
      }

      currentState = validMoves[getRandomInt(0, validMoves.length - 1)].state
      checkResult = checkFin(currentState)
    }

    return checkResult.winner === "ai"
  }

  score(): string {
    return `${this.winNumber} / ${this.attemptNumber} (${(
      (NUMCELLS * this.winNumber) /
      this.attemptNumber
    ).toFixed(0)} %)`
  }

  reflectResult(isWin: boolean): void {
    this.attemptNumber += 1
    this.winNumber += isWin ? 1 : 0
  }

  possibleChildNodes(): GameNode[] {
    const valids = validIndexes(this.state)
      .map((index) => apply(this.state, index))
      .map((state) => new GameNode(state))

    return valids.length !== 0
      ? valids
      : [
          new GameNode({
            boardState: this.state.boardState,
            nextPlayer: this.state.nextPlayer === "ai" ? "opponent" : "ai",
          }),
        ]
  }

  setChildren(): void {
    this.children = this.possibleChildNodes()
  }

  isLeaf(): boolean {
    return this.children.length === 0
  }

  uct(parentNode: GameNode, config: MctsConfig): number {
    const reward = this.reward()
    const bias =
      this.attemptNumber !== 0
        ? 2 *
          config.CP *
          Math.sqrt(
            (2 * Math.log(parentNode.attemptNumber)) / this.attemptNumber
          )
        : 99999999

    return reward + bias
  }

  reward(): number {
    return this.attemptNumber !== 0 ? this.winNumber / this.attemptNumber : 0.0
  }

  getBestChildNode(): GameNode {
    return this.children.reduce(
      (s, t) => (s.reward() > t.reward() ? s : t),
      this.children[0]
    )
  }

  getChildNodeByIndex(state: GameState): GameNode | undefined {
    if (this.isLeaf()) this.setChildren()

    return this.children.find((node) =>
      node.state.boardState.reduce(
        (s: boolean, line, i) =>
          s &&
          line.reduce(
            (lineSum: boolean, value, j) =>
              lineSum && state.boardState[i][j] === value,
            true
          ),
        true
      )
    )
  }

  getState(): GameState {
    return this.state
  }

  static fromJson(jsonData: JsonNode): GameNode {
    const state = {
      boardState: jsonData.state.boardState.map((line) =>
        line.map((value) => (value === null ? undefined : value))
      ),
      nextPlayer: jsonData.state.nextPlayer,
    }

    const node = new GameNode(state, false)
    node.attemptNumber = jsonData.attemptNumber
    node.winNumber = jsonData.winNumber
    node.children = jsonData.children.map((node) => GameNode.fromJson(node))
    return node
  }
}
