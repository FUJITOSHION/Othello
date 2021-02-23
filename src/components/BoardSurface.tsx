import { Cell } from "./Cell"

export const BoardSurface: React.FC = () => {
  return (
    <div>
      <p>hello</p>
      <Cell state={"ai"} />
      <Cell state={"opponent"} />
      <Cell state={undefined} />
    </div>
  )
}
