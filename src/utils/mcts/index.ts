import { range } from "ramda"

import type { GameState, CellState, JsonNode } from "types"
import type { MctsConfig } from "./types"
import { GameTree } from "./game-tree"
import { GameNode } from "./game-node"

export class MCTS {
  private config: MctsConfig
  public tree: GameTree
  private selectedNodeList: GameNode[]

  constructor(config: MctsConfig, state?: GameState, node?: GameNode) {
    this.config = config
    let rootNode: GameNode
    if (state !== undefined) {
      rootNode = new GameNode(state, true)
    } else if (node !== undefined) {
      rootNode = node
    } else {
      throw Error("MCTS コンストラクタには、state または node が必須です")
    }

    this.tree = new GameTree(rootNode)
    this.selectedNodeList = []
  }

  // === For Outside ===
  getNextStateFirst(callback: (state: GameState) => void): void {
    this.run(callback)
  }

  getNextState(state: GameState, callback: (state: GameState) => void): void {
    // AIの行動を反映した盤面を返却
    this.tree.applyOpponentNode(state)
    this.run(callback)
  }

  run(callback: (state: GameState) => void): void {
    const rootNode = this.tree.getRootNode()
    console.log("学習開始", rootNode)
    this.runSteps()
    this.tree.updateRootNode()
    console.log("学習終了", rootNode, "=>", this.tree.getRootNode())
    callback(this.tree.getRootNode().getState())
  }

  updateConfig(config: MctsConfig): void {
    this.config = config
  }

  // === MCTS core steps ===
  runSteps(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of range(1, this.config.stepNumber)) {
      this.select()
      this.expand()
      this.backPropagate(this.simulate())
    }
  }

  runStepsLocal(writer: (tree: GameTree) => void, sep: number): void {
    for (const i of range(1, this.config.stepNumber)) {
      this.select()
      this.expand()
      this.backPropagate(this.simulate())

      if (i % sep === 0) {
        writer(this.tree)
      }
    }
  }

  select(): void {
    // 根ノードから葉ノードまで選択
    let currentNode = this.tree.getRootNode()
    this.selectedNodeList = [currentNode]

    currentNode = currentNode.select(this.config)
    this.selectedNodeList.push(currentNode)

    while (!currentNode.isLeaf()) {
      currentNode = currentNode.select(this.config)
      this.selectedNodeList.push(currentNode)
    }
  }

  expand(): void {
    // 葉ノードを拡張
    this.getSelectedLeafNode().expand(this.config)
  }

  simulate(): boolean {
    // シミュレーション結果
    const isWin = this.getSelectedLeafNode().simulate()
    return isWin
  }

  backPropagate(isWin: boolean): void {
    this.selectedNodeList.forEach((node) => {
      node.reflectResult(isWin)
    })
  }

  // === Util ===
  getSelectedLeafNode(): GameNode {
    return this.selectedNodeList[this.selectedNodeList.length - 1]
  }

  static fromJson(config: MctsConfig, jsonNode: JsonNode): MCTS {
    const Mcts = new MCTS(config, undefined, GameNode.fromJson(jsonNode))
    Mcts.selectedNodeList = []

    return Mcts
  }
}

export function getInitCells(isAiWhite: boolean): CellState[][] {
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

  return initCells
}
