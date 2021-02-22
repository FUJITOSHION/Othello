import type { MctsConfig } from "./types"
import type { GameTree } from "./game-tree"
import type { GameNode } from "./game-node"
import { getRandomInt } from "@utils/random"

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
  getNextTarget(): [number, number] | undefined {
    // 次回のこちらの行動 (RETURN: 置く場所の添字 or 行動不可)
    throw Error("未実装")
  }

  updateConfig(config: MctsConfig): void {
    this.config = config
  }

  // === MCTS core steps ===
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
    const leafNode = this.selectedNodeList[this.selectedNodeList.length - 1]
    leafNode.expand(this.config)
  }

  simulate(): boolean {
    // シミュレーション結果
    // 仮実装: 50%の確率で勝利判定
    return getRandomInt(0, 100) > 50
  }

  backPropagate(isWin: boolean): void {
    this.selectedNodeList.forEach((node) => {
      node.reflectResult(isWin)
    })
  }
}
