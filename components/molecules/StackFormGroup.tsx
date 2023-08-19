import React, { FC } from 'react'
import CheckBoxGroup from './CheckBoxGroup';
import DateInput from '../molecules/DateInput';
import RichTextEditor from '../molecules/RichTextEditor';
import TextInput from './TextInput';
import { ControlAndSetValueProps } from '../../types/types';

const StackFormGroup: FC<ControlAndSetValueProps> = ({ setValue, control }) => {
  return (
    <>
      <CheckBoxGroup setValue={setValue} control={control} />
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
          label={"Stacked Time"}
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
        label={"Title"}
        placeholder={"Reactの学習..."}
        type='text'
      />
      <RichTextEditor control={control} />
    </>
  )
}

export default StackFormGroup
