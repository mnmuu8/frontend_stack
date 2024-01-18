import React, { FC, useContext } from 'react';
import TextInput from '@/components/ui-elements/TextInput';

import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import RichTextEditor from '../rich_editors/components/RichTextEditor';
import { OutputFormContext } from '../contexts/OutputFormContext';
import { ErrorMessagesState } from '@/common/types/validator';

const OutputFormGroup: FC<ErrorMessagesState> = ({ errorMessages }) => {
  const { outputFormData, setOutputFormData } = useContext(OutputFormContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOutputFormData({
      ...outputFormData,
      [name]: value,
    });
  };

  return (
    <>
      <div className='hidden'>
        <TextInput
          name={'content'}
          fullWidth={true}
          multiline={true}
          minRows={1}
          required={true}
          requiredMessage={'必須入力'}
          label={'内容'}
          placeholder={'ChatGPTの便利な使い方を紹介...'}
          type='text'
          onChange={handleFieldChange}
          value={outputFormData.content}
        />
      </div>
      <RichTextEditor />
      <ErrorMessage errorMessages={errorMessages} errorKey={'content'} />
    </>
  );
};

export default OutputFormGroup;
