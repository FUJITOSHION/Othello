import FormControlLabel from "@material-ui/core/FormControlLabel"
import BaseCheckbox from "@material-ui/core/Checkbox"
import orange from "@material-ui/core/colors/orange"

type CheckboxProps = {
  name?: string
  label: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <BaseCheckbox
          checked={checked}
          onChange={onChange}
          style={{
            color: orange[800],
          }}
        />
      }
      label={label}
      name={name ?? label}
      className="m-un-selectable"
    />
  )
}
