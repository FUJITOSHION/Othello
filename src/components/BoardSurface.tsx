import { memo } from "react"

import styles from "@styles/modules/BoardSurface.module.scss"
import type { BoardIndex, CellState } from "types"
import { Cell } from "./Cell"

type BoardSurfaceProps = {
  cells: CellState[][]
  handleCellClick: (index: BoardIndex) => void
}

const BoardSurfaceComp: React.FC<BoardSurfaceProps> = ({
  cells,
  handleCellClick,
}: BoardSurfaceProps) => {
  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {cells.map((line, i) => (
          <div className={styles.boardRow} key={i}>
            {line.map((cell, j) => (
              <Cell
                state={cell}
                key={j}
                onClick={() => {
                  handleCellClick([i, j])
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export const BoardSurface = memo(BoardSurfaceComp)
