import React, { FC } from 'react'
import { Controller } from 'react-hook-form';
import { FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import CheckBoxLabel from '../atoms/CheckBoxLabel';

import { CheckBoxProps } from '@/types/types';

const CheckBox: FC<CheckBoxProps> = ( props ) => {
  const { control, setValue } = props;

  // TODO: APIデータ受け取り。後々実装
  const skills = ['Ruby on Rails', 'PHP', 'React', 'Next', 'TypeScript', 'WordPress', 'Python', 'Java', 'jQuery', 'Vue', 'React Native', 'Django']

  return (
    <Box className="mt-4">
      <Controller
        name="skills"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormGroup sx={{ flexDirection: "inherit" }}>
            {skills.map((skill: string, index: number) => (
              <CheckBoxLabel key={index} skill={skill} setValue={setValue} field={field} />
            ))}
          </FormGroup>
        )}
      />
    </Box>
  )
}

export default CheckBox 
