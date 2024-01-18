import React, { FC, useContext } from 'react';
import TextInput from '@/components/ui-elements/TextInput';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { InviteTeamFormContext } from '../contexts/InviteTeamFormContext';
import { ErrorMessagesState } from '@/common/types/validator';

const InviteTeamFormGroup: FC<ErrorMessagesState> = ({ errorMessages }) => {
  const { inviteTeamFormData, setInviteTeamFormData } = useContext(InviteTeamFormContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInviteTeamFormData({
      ...inviteTeamFormData,
      [name]: value,
    });
  };

  return (
    <>
      <TextInput
        name={'email'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'メールアドレス'}
        placeholder={'招待するメンバーのメールアドレスを入力してください'}
        type='text'
        onChange={handleFieldChange}
        value={inviteTeamFormData.email}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'email'} />
    </>
  );
};

export default InviteTeamFormGroup;
