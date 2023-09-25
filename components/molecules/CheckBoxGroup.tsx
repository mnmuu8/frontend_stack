import React, { FC, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import { FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import CheckBoxLabel from './CheckBoxLabel';
import { ControlAndSetValueProps, Skill } from '@/types/types';
import axios from 'axios';
import { getSession } from '@/utiliry/session';

const CheckBoxGroup: FC<ControlAndSetValueProps> = ({ control, setValue }) => {
  const [skills, setSkills] = useState<Skill[]>([])
 
  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;
 
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      }
    }
    axios.get('http://localhost:3000/api/v1/skills', options)
    .then(response => {
      const { data } = response;
      setSkills(data.skills);
    })
    .catch(error => {
      if (error.response) {
        const { data } = error.response;
        throw new Error(`${JSON.stringify(data)}`);
      } else {
        throw new Error(`${JSON.stringify(error)}`);
      }
    });
  }, [])

  return (
    <Box className="mt-4">
      <Controller
        name="skill"
        control={control}
        defaultValue={skills[0]}
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
