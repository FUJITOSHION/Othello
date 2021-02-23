import type { AILevel } from "types"
import gameConfigSlice from "@store/game-config/slice"
import { useDispatch } from "@hooks/store"
import { useAiLevel } from "@hooks/store/game-config"

export const SelectionCpuLevel: React.FC = () => {
  // const [level, setLevel] = useState<AILevel>("強い")
  const level = useAiLevel()
  const dispatch = useDispatch()

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setLevel(e.target.value as AILevel)
    dispatch(gameConfigSlice.actions.setAiLevel(e.target.value as AILevel))
  }
  return (
    <div>
      <span>CPUの強さを選んでください</span>
      <select name="level" onChange={handleLevelChange} value={level}>
        {["強い", "普通", "弱い"].map((lev) => (
          <option value={lev} key={lev}>
            {lev}
          </option>
        ))}
      </select>
    </div>
  )
}
