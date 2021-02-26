import type { AILevel } from "types"
import gameConfigSlice from "@store/game-config"
import { useDispatch } from "@hooks/store"
import { useAiLevel } from "@hooks/store/game-config"
import { Select } from "@components/Select"
import styles from "@styles/modules/SelectionCpuLevel.module.scss"

export const SelectionCpuLevel: React.FC = () => {
  const level = useAiLevel()
  const dispatch = useDispatch()

  return (
    <div className={`m-un-selectable ${styles.container}`}>
      <span className={styles.label}>CPUの強さを選ぶ: </span>
      <Select
        label="強さ"
        items={["強い", "普通", "弱い"]}
        value={level}
        handleChange={(e) => {
          dispatch(
            gameConfigSlice.actions.setAiLevel(e.target.value as AILevel)
          )
        }}
      />
    </div>
  )
}
