import React, { FC, useEffect, useContext, useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { getSession } from '@/utiliry/session';
import { ApiOptions } from '@/types/api';
import { SkillProps } from '@/types/skill';
import axios from 'axios';
import { FormDataContext } from '@/context/FormDataContext';
import { getApiHeaders } from '@/utiliry/api';

const SkillInput: FC = () => {
  const [skills, setSkills] = useState<SkillProps[]>([])

  const formDataContext = useContext(FormDataContext);
  const { stackFormData, setStackFormData } = formDataContext;

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setStackFormData({
      ...stackFormData,
      [name]: value,
    });
  };
 
  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders(sessionData)
 
    axios.get(`${process.env.API_ROOT_URL}/api/v1/skills`, options)
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
    <div className='Skill-RadioGroup pt-4 pb-2'>
      <FormControl>
        <RadioGroup
          name="skill"
          value={stackFormData.skill}
          onChange={handleFieldChange}
        >
          {skills.map((skill) => (
            <FormControlLabel key={skill.id} value={skill.id} control={<Radio />} label={skill.name} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default SkillInput 
