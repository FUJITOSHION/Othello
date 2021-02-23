import { useState, useEffect } from "react"

export const CalcGameTime: React.FC = () => {
  const [nowTime, setNowTime] = useState<number>(0)

  const DisplayTime = (nowTime: number) => {
    return (
      "経過時間" +
      ("00" + Math.floor(nowTime / 60).toString()).slice(-2) +
      ":" +
      ("00" + Math.floor(nowTime % 60).toString()).slice(-2)
    )
  }

  useEffect(() => {
    let n = 0
    setInterval(() => {
      n++
      setNowTime(n)
    }, 1000)
  }, [])
  return <div>{DisplayTime(nowTime)}</div>
}
