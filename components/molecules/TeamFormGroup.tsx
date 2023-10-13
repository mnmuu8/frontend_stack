import React, { FC, useContext } from 'react'
import TextInput from './TextInput';
import { ControlProps } from '@/types/types';
import AppContext from '@/context/AppContext';

const TeamFormGroup: FC<ControlProps> = ({ control }) => {
  const appContext = useContext(AppContext);
  const { teamFormData, setTeamFormData } = appContext;

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setTeamFormData({
      ...teamFormData,
      name: e.target.value,
    });
  };

  return (
    <>
      <TextInput 
        control={control}
        name={"name"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"チーム名"}
        placeholder={"エンジニア第７世代"}
        type='text'
        onChange={handleFieldChange}
        value={teamFormData.name}
      />
    </>
  )
}

export default TeamFormGroup