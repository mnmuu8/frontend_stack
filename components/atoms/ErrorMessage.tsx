import { ErrorMessagesProps } from '@/types/validator';
import React, { FC } from 'react';

const ErrorMessage: FC<ErrorMessagesProps> = ({ errorMessages, errorKey }) => {
  const errorMessage = errorMessages[errorKey];
  return <p className='text-red-500'>{errorMessage ? errorMessage : ''}</p>;
};

export default ErrorMessage;
