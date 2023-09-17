import React, { FC } from 'react'
import CheckBoxTeam from './CheckBoxTeam';
import DateInput from '../molecules/DateInput';
import RichTextEditor from '../molecules/RichTextEditor';
import TextInput from './TextInput';
import { ControlAndSetValueProps } from '../../types/types';

const StackFormTeam: FC<ControlAndSetValueProps> = ({ setValue, control }) => {
  return (
    <>
      <CheckBoxTeam setValue={setValue} control={control} />
      <div className='flex'>
        <DateInput control={control} />
        <TextInput 
          control={control}
          name={"time"}
          fullWidth={true}
          multiline={false}
          minRows={1}
          required={true}
          requiredMessage={"必須入力"}
          label={"積み上げ時間"}
          placeholder={"8"}
          type='number'
        />
      </div>
      <TextInput 
        control={control}
        name={"title"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"タイトル"}
        placeholder={"Reactの学習..."}
        type='text'
      />
      <RichTextEditor control={control} />
    </>
  )
}

export default StackFormTeam
