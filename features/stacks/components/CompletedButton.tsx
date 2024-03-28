import React, { FC, useContext, useState } from 'react';
import { ErrorMessagesState } from '@/common/types/validator';
import { StackFormContext } from '../contexts/StackFormContext';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const CompletedButton: FC = () => {
  const { stackFormData, setStackFormData } = useContext(StackFormContext);
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
    <FormGroup>
      <FormControlLabel
        required
        control={<Switch name='completed' checked={isChecked} onChange={handleChange} />}
        label={isChecked ? '完了済み' : '未完了'}
      />
    </FormGroup>
  );
};

export default CompletedButton;
