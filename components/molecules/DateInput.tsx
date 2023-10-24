import React, { FC, useContext } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Box from '@mui/material/Box';
import { FormDataContext } from '@/context/FormDataContext';

const DateInput: FC = () => {
  const formDataContext = useContext(FormDataContext);
  const { stackFormData, setStackFormData } = formDataContext;

  const handleDateChange = (stacked_at: Date | null) => {
    setStackFormData({
      ...stackFormData,
      stacked_at
    })
  };

  return (
    <Box className="mt-4 mr-4">
      <ReactDatePicker
        selected={stackFormData.stacked_at}
        placeholderText="積み上げ日付"
        onChange={handleDateChange}
        dateFormat={"yyyy/MM/dd"}
        dateFormatCalendar='yyyy/MM/dd'
      />
    </Box>
  )
}

export default DateInput
