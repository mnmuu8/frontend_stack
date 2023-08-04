import React, { FC } from 'react'
import { Controller } from 'react-hook-form';
import { FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import CheckBoxLabel from './CheckBoxLabel';

import { CheckBoxGroupProps, Skill } from '@/types/types';

const CheckBoxGroup: FC<CheckBoxGroupProps> = ({ control, setValue }) => {
  // TODO: APIデータ受け取り。後々実装
  const skills: Skill[] = [
    { id: 1, name: 'Ruby on Rails', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 2, name: 'PHP', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 3, name: 'React', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 4, name: 'Next', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 5, name: 'TypeScript', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 6, name: 'WordPress', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 7, name: 'Python', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 8, name: 'Java', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 9, name: 'jQuery', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 10, name: 'Vue', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 11, name: 'React Native', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
    { id: 12, name: 'Django', created_at: "2023-01-01T00:00:00+09:00", updated_at: "2023-01-01T00:00:00+09:00" },
  ];

  return (
    <Box className="mt-4">
      <Controller
        name="skill"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <FormGroup sx={{ flexDirection: "inherit" }}>
            {skills.map((skill: Skill) => (
              <CheckBoxLabel 
                key={skill.id}
                skill={skill}
                setValue={setValue}
                field={field}
              />
            ))}
          </FormGroup>
        )}
      />
    </Box>
  )
}

export default CheckBoxGroup 
