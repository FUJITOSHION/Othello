import type { GameNode } from "./game-node"

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
}
