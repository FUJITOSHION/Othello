import { useState } from "react"
type Level = "強い" | "普通" | "弱い"

export const SelectionCpuLevel: React.FC = () => {
  const [level, setLevel] = useState<Level>("強い")

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Level
    setLevel(value)
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
