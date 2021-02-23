import { useState } from "react"

import type { AILevel } from "types"

export const SelectionCpuLevel: React.FC = () => {
  const [level, setLevel] = useState<AILevel>("強い")

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as AILevel)
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
