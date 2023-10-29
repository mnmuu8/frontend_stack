import { FormSubmitButtonProps } from '@/types/utils'
import { Button } from '@mui/material'
import React, { FC } from 'react'

const FormSubmitButton: FC<FormSubmitButtonProps> = ({ onClick, disabled, label }) => {
  return (
    <Button
      className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full'
      type='submit'
      onClick={onClick} 
      disabled={disabled}
    >
      {label}
    </Button>
  )
}

export default FormSubmitButton
