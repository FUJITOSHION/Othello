import ReplayIcon from "@material-ui/icons/Replay"

import { Button } from "@components/Button"

export const RestartButton: React.FC = () => {
  const handleRestartButton = (): void => {
    location.reload()
  }
  return (
    <Button
      text={"最初からプレイする"}
      handleClick={handleRestartButton}
      icon={<ReplayIcon />}
    />
  )
}
