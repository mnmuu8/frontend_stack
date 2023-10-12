import React, { FC, useContext, useState } from 'react'
import TextInput from './TextInput';
import { ControlProps } from '@/types/types';
import AppContext from '@/context/AppContext';

const TeamFormGroup: FC<ControlProps> = ({ control }) => {
  const appContext = useContext(AppContext);
  const { teamFormData, setTeamFormData } = appContext;

  console.log(teamFormData);

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamFormData(e.target.value)}
        value={teamFormData}
      />
    </>
  )
}

export default TeamFormGroup
