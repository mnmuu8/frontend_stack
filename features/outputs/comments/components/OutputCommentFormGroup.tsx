import React, { FC, useContext } from 'react';
import TextInput from '@/components/ui-elements/TextInput';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { OutputCommentFormContext } from '../contexts/OutputCommentFormContext';
import { ErrorMessagesState } from '@/common/types/validator';
import OutputCommentEditor from './OutputCommentEditor';

const OutputCommentFormGroup: FC<ErrorMessagesState> = ({ errorMessages }) => {
  const { outputCommentFormData, setOutputCommentFormData } = useContext(OutputCommentFormContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOutputCommentFormData({
      ...outputCommentFormData,
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
          minRows={5}
          required={true}
          requiredMessage={'必須入力'}
          label={'コメント'}
          placeholder={'コメントを入力...'}
          type='text'
          onChange={handleFieldChange}
          value={outputCommentFormData.content}
        />
      </div>
      <OutputCommentEditor />
      <ErrorMessage errorMessages={errorMessages} errorKey={'content'} />
    </>
  );
};

export default OutputCommentFormGroup;
