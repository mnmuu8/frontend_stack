import React, { FC, useContext } from 'react';
import TextInput from '@/components/ui-elements/TextInput';
import { ErrorMessagesState } from '@/common/types/validator';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { TeamFormContext } from '../contexts/TeamFormContext';

const TeamFormGroup: FC<ErrorMessagesState> = ({ errorMessages }) => {
  const { teamFormData, setTeamFormData } = useContext(TeamFormContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTeamFormData({
      ...teamFormData,
      [name]: value,
    });
  };

  return (
    <>
      <TextInput
        name={'name'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'チーム名'}
        placeholder={'エンジニア第７世代'}
        type='text'
        onChange={handleFieldChange}
        value={teamFormData.name}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'name'} />
    </>
  );
};

export default TeamFormGroup;
