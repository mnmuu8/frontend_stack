import React, { FC, useEffect } from 'react'
import TextInput from './TextInput';
import { ControlAndSetValueProps } from '../../types/types';

const UserFormGroup: FC<ControlAndSetValueProps> = ({ control }) => {
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
        label={"Name"}
        placeholder={"uyu_morning"}
        type='text'
      />

      <TextInput
        control={control}
        name={"email"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"Email"}
        placeholder={"example@example.com"}
        type='text'
      />

      <TextInput
        control={control}
        name={"profile_content"}
        fullWidth={true}
        multiline={true}
        minRows={10}
        required={true}
        requiredMessage={"必須入力"}
        label={"ProfileContent"}
        placeholder={"プロフィール文"}
        type='text'
      />

      <TextInput
        control={control}
        name={"group"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"Group"}
        placeholder={"グループ1"}
        type='text'
      />
    </>
  )
}

export default UserFormGroup
