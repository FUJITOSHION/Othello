import { range } from "ramda"

import type { GameState } from "types"
import type { MctsConfig } from "./types"
import { GameTree } from "./game-tree"
import { GameNode } from "./game-node"

export class MCTS {
  private config: MctsConfig
  private tree: GameTree
  private selectedNodeList: GameNode[]

  constructor(config: MctsConfig, state: GameState) {
    this.config = config
    const rootNode = new GameNode(state, true)
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
    this.runSteps()
    console.log("学習終了", this.tree.getRootNode())
    this.tree.updateRootNode()
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
}
