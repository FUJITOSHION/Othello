import type { GameState } from "types"
import { GameNode } from "./game-node"

export class GameTree {
  private rootNode: GameNode

  constructor(rootNode: GameNode) {
    this.rootNode = rootNode
  }

  getRootNode(): GameNode {
    return this.rootNode
  }

  updateRootNode(): void {
    this.rootNode = this.rootNode.getBestChildNode()
  }

  applyOpponentNode(state: GameState): void {
    const nextNode = this.rootNode.getChildNodeByIndex(state)

    if (!nextNode) throw Error("その手は存在しません")
    if (nextNode.isLeaf()) nextNode.setChildren()

    this.rootNode = nextNode
  }
}
