import React, { FC, useEffect, useRef } from 'react'

import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import { DateInputProps } from '@/types/types';

const DateInput: FC<DateInputProps> = ( props: DateInputProps ) => {
  const { control } = props;
  const datepickerRef = useRef<ReactDatePicker>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(false);
    }
  }, []);

  return (
    <Box className="mt-4 mr-4">
      <Controller
        name="date"
        control={control}
        defaultValue={new Date()}
        rules={{
          required: { value: true, message: "必須入力" }
        }}
        render={({ field, fieldState }) => (
          <>
            <ReactDatePicker
              {...field}
              ref={datepickerRef}
              selected={field.value}
              placeholderText="Date"
              onChange={(date) => field.onChange(date)}
              dateFormat={"yyyy/MM/dd"}
              dateFormatCalendar='yyyy/MM/dd'
            />
            {fieldState?.error && <p className='text-xs text-[#d32f2f] mt-[3px] mx-[14px]'>{fieldState?.error.message}</p>}
          </>
        )}
      />
    </Box>
  )
}

export default DateInput
