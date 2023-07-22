import React, { FC } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import { UseFormSetValue, ControllerRenderProps } from 'react-hook-form';
import { StackFormData } from '@/types/types';

type CheckBoxLabelProps = {
  skill: string;
  setValue: UseFormSetValue<StackFormData>
  field: ControllerRenderProps<StackFormData, "skills">;
}

const CheckBoxLabel: FC<CheckBoxLabelProps> = ( props ) => {
  const { skill, field, setValue } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value.includes(skill)}
          onChange={(e) => {
            const checkedValue = e.target.value;
            const isChecked = e.target.checked;
            const updatedValue = isChecked
              ? [...field.value, checkedValue]
              : field.value.filter((item: any) => item !== checkedValue);
            setValue('skills', updatedValue);
          }}
          value={skill}
        />
      }
      label={skill}
    />
  )
}

export default CheckBoxLabel
