import React from "react"
import BaseButton from "@material-ui/core/Button"

type SelectProps = {
  text: string
  icon: React.ReactNode
  disabled?: boolean
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<SelectProps> = ({
  text,
  icon,
  disabled,
  handleClick,
}: SelectProps) => {
  return (
    <BaseButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      disabled={disabled}
      startIcon={icon}
    >
      {text}
    </BaseButton>
  )
}
