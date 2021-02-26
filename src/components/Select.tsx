import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import BaseSelect from "@material-ui/core/Select"

import { mainColor } from "@pages/_app"

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
  select: {
    color: mainColor,
    textAlign: "center",
  },
})

type SelectProps = {
  label: string
  labelId?: string
  items: string[]
  value: string
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

export const Select: React.FC<SelectProps> = ({
  label,
  labelId,
  items,
  value,
  handleChange,
}: SelectProps) => {
  const classes = useStyles()

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      color="primary"
    >
      <InputLabel id={labelId} classes={classes} color="primary">
        {label}
      </InputLabel>
      <BaseSelect
        labelId={labelId}
        value={value}
        onChange={handleChange}
        label="Age"
        color="primary"
        className={classes.select}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </BaseSelect>
    </FormControl>
  )
}
