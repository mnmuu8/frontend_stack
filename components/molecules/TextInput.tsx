import React, { FC } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextInputProps } from '@/types/form';

const TextInput: FC<TextInputProps> = ({ name, fullWidth, multiline, minRows, required, requiredMessage, label, placeholder, type, onChange, onClick, value  }) => {
  return (
    <Box 
      className="mt-4"
      onChange={onChange}
      onClick={onClick}
    >
      <TextField
        type={type}
        name={name}
        label={label}
        value={value}
        minRows={minRows}
        fullWidth={fullWidth}
        multiline={multiline}
        required={required}
        placeholder={placeholder}
      />
    </Box>
  )
}

export default TextInput