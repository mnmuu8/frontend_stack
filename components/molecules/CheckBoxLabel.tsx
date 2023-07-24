import React, { FC } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import { CheckBoxLabelProps } from '@/types/types';

const CheckBoxLabel: FC<CheckBoxLabelProps> = ( props ) => {
  const { skill, field, setValue } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value.some((v) => v.id === skill.id)}
          onChange={(e) => {
            const isChecked = e.target.checked;
            const updatedValue = isChecked
              ? [...field.value, skill]
              : field.value.filter((v) => v.id !== skill.id);
            setValue('skills', updatedValue);
          }}
          value={skill.id}
        />
      }
      label={skill.name}
    />
  )
}

export default CheckBoxLabel
