import React, { FC, useContext } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Box from '@mui/material/Box';
import { FormDataContext } from '@/context/FormDataContext';

import { stackValidationRules } from '@/utiliry/validator';
import { ErrorMessagesState } from '@/types/validator';
import ErrorMessage from '../atoms/ErrorMessage';

const DateInput: FC<ErrorMessagesState> = ({ errorMessages, setErrorMessages }) => {
  const formDataContext = useContext(FormDataContext);
  const { stackFormData, setStackFormData } = formDataContext;

  const handleDateChange = (stacked_at: Date) => {

    const validationRule = stackValidationRules['stacked_at'];
    if (validationRule) {
      const isValid = validationRule(stacked_at ? stacked_at.toString() : '');
      setErrorMessages({
        ...errorMessages,
        stacked_at: isValid ? '' : '必須項目です',
      });
    }

    setStackFormData({
      ...stackFormData,
      stacked_at
    })
  };

  return (
    <Box className="mt-4 mr-4">
      <ReactDatePicker
        name='stacked_at'
        selected={stackFormData.stacked_at}
        placeholderText="積み上げ日付"
        onChange={handleDateChange}
        dateFormat={"yyyy/MM/dd"}
        dateFormatCalendar='yyyy/MM/dd'
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'stacked_at'} />
    </Box>
  )
}

export default DateInput
