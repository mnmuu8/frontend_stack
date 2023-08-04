import React, { FC } from 'react'
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { TextInputProps } from '@/types/types';

const TextInput: FC<TextInputProps> = ({ control, name, fullWidth, multiline, minRows, required, requiredMessage, label, placeholder, type }) => {
  return (
    <Box className="mt-4">
      <Controller
        name={name}
        control={control}
        rules={{
          required: { value: required, message: requiredMessage }
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={label}
            fullWidth={fullWidth}
            multiline={multiline}
            minRows={minRows}
            placeholder={placeholder}
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message as string}
            type={type}
          />
        )}
      />
    </Box>
  )
}

export default TextInput