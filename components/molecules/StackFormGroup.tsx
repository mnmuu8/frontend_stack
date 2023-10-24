import React, { FC, useContext } from 'react'

import DateInput from './DateInput';
import TextInput from './TextInput';
import SkillInput from './SkillInput';
import { FormDataContext } from '@/context/FormDataContext';

const StackFormGroup: FC = () => {
  const formDataContext = useContext(FormDataContext);
  const { stackFormData, setStackFormData } = formDataContext;

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setStackFormData({
      ...stackFormData,
      [name]: value,
    });
  };

  return (
    <>
      <SkillInput />
      <div className='flex'>
        <DateInput />
        <TextInput 
          name={"minutes"}
          fullWidth={true}
          multiline={false}
          minRows={1}
          required={true}
          requiredMessage={"必須入力"}
          label={"積み上げ時間"}
          placeholder={"8"}
          type='number'
          value={stackFormData.minutes}
          onChange={handleFieldChange}
        />
      </div>
      <TextInput 
        name={"title"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"タイトル"}
        placeholder={"Reactの学習..."}
        type='text'
        value={stackFormData.title}
        onChange={handleFieldChange}
      />
      <TextInput 
        name={"description"}
        fullWidth={true}
        multiline={true}
        minRows={5}
        required={true}
        requiredMessage={"必須入力"}
        label={"積み上げ内容"}
        placeholder={"ReactHooksを学習しました。useStateについて..."}
        type='text'
        value={stackFormData.description}
        onChange={handleFieldChange}
      />
    </>
  )
}

export default StackFormGroup
