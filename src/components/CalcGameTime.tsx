import { useState, useEffect } from "react"

type CalcGameTimeProps = {
  className?: string
}

export const CalcGameTime: React.FC<CalcGameTimeProps> = ({
  className,
}: CalcGameTimeProps) => {
  const [nowTime, setNowTime] = useState<number>(0)

  const DisplayTime = (nowTime: number) => {
    return (
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
  return <div className={className}>{DisplayTime(nowTime)}</div>
}
