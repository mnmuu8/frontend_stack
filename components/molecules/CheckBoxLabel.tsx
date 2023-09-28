import React, { FC } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import { CheckBoxLabelProps } from '@/types/types';

const CheckBoxLabel: FC<CheckBoxLabelProps> = ({ skill, field, setValue }) => {
  const isChecked = field.value?.id === skill.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('skill', skill);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          value={skill.id}
        />
      }
      label={skill.name}
    />
  )
}

export default CheckBoxLabel
