import React, { FC, useContext, useState } from 'react';
import DateInput from './DateInput';
import TextInput from '@/components/ui-elements/TextInput';
import SkillInput from '@/features/skills/components/SkillInput';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { StackFormContext } from '../contexts/StackFormContext';
import { ErrorMessagesState } from '@/common/types/validator';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const StackFormGroup: FC<ErrorMessagesState> = ({ errorMessages, setErrorMessages }) => {
  const { stackFormData, setStackFormData } = useContext(StackFormContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'minutes' ? parseInt(value, 10) : value;

    setStackFormData({
      ...stackFormData,
      [name]: updatedValue,
    });
  };

  const [isChecked, setIsChecked] = useState(stackFormData.completed);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    setIsChecked(newChecked);
    setStackFormData(prevFormData => ({
      ...prevFormData,
      completed: newChecked,
    }));
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          required
          control={<Switch name='completed' checked={isChecked} onChange={handleChange} />}
          label={isChecked ? '完了済み' : '未完了'}
        />
      </FormGroup>
      <SkillInput />
      <ErrorMessage errorMessages={errorMessages} errorKey={'skill'} />
      <div className='flex'>
        <DateInput errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        <div>
          <TextInput
            name={'minutes'}
            fullWidth={true}
            multiline={false}
            minRows={1}
            required={true}
            requiredMessage={'必須入力'}
            label={'積み上げ時間'}
            placeholder={'8'}
            type='number'
            value={stackFormData.minutes}
            onChange={handleFieldChange}
          />
          <ErrorMessage errorMessages={errorMessages} errorKey={'minutes'} />
        </div>
      </div>
      <TextInput
        name={'title'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'タイトル'}
        placeholder={'Reactの学習...'}
        type='text'
        value={stackFormData.title}
        onChange={handleFieldChange}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'title'} />
      <TextInput
        name={'description'}
        fullWidth={true}
        multiline={true}
        minRows={5}
        required={true}
        requiredMessage={'必須入力'}
        label={'積み上げ内容'}
        placeholder={'ReactHooksを学習しました。useStateについて...'}
        type='text'
        value={stackFormData.description}
        onChange={handleFieldChange}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'description'} />
    </>
  );
};

export default StackFormGroup;
