import React, { FC } from 'react';
import { Button } from '@mui/material';
import { FormCancelButtonProps } from '@/common/types/ui-elements/button';

const FormCancelButton: FC<FormCancelButtonProps> = ({ onClick }) => {
  return (
    <Button className='bg-gray-300 hover:bg-gray-200 text-gray-800 mx-2 w-full py-4' onClick={onClick}>
      キャンセル
    </Button>
  );
};

export default FormCancelButton;
