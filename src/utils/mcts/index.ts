import { range } from "ramda"

import { GameState } from "types"
import type { MctsConfig } from "./types"
import type { GameTree } from "./game-tree"
import type { GameNode } from "./game-node"

export class MCTS {
  private config: MctsConfig
  private tree: GameTree
  private selectedNodeList: GameNode[]

  constructor(config: MctsConfig, tree: GameTree) {
    this.config = config
    this.tree = tree
    this.selectedNodeList = []
  }

  // === For Outside ===
  getNextState(): GameState {
    // AIの行動を反映した盤面を返却
    this.runSteps()
    this.tree.updateRootNode()
    return this.tree.getRootNode().getState()
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
    let nextNode = this.tree.getRootNode()
    this.selectedNodeList = []

    while (nextNode.isLeaf()) {
      this.selectedNodeList.push(nextNode)
      nextNode = nextNode.select(this.config)
    }
  }

  expand(): void {
    // 葉ノードを拡張
    this.getSelectedLeafNode().expand(this.config)
  }

  simulate(): boolean {
    // シミュレーション結果
    return this.getSelectedLeafNode().simulate()
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
