import React, { FC } from 'react'
import { Controller } from 'react-hook-form';
import { FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import CheckBoxLabel from './CheckBoxLabel';

import { CheckBoxProps, Skill } from '@/types/types';

const CheckBox: FC<CheckBoxProps> = ( props ) => {
  const { control, setValue } = props;

  // TODO: APIデータ受け取り。後々実装
  const skills: Skill[] = [
    { id: '1', name: 'Ruby on Rails' },
    { id: '2', name: 'PHP' },
    { id: '3', name: 'React' },
    { id: '4', name: 'Next' },
    { id: '5', name: 'TypeScript' },
    { id: '6', name: 'WordPress' },
    { id: '7', name: 'Python' },
    { id: '8', name: 'Java' },
    { id: '9', name: 'jQuery' },
    { id: '10', name: 'Vue' },
    { id: '11', name: 'React Native' },
    { id: '12', name: 'Django' },
  ];  

  return (
    <Box className="mt-4">
      <Controller
        name="skills"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormGroup sx={{ flexDirection: "inherit" }}>
            {skills.map((skill: Skill) => (
              <CheckBoxLabel key={skill.id} skill={skill} setValue={setValue} field={field} />
            ))}
          </FormGroup>
        )}
      />
    </Box>
  )
}

export default CheckBox 
