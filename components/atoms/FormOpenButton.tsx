import React, { FC, useContext } from 'react'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppContext from '@/context/AppContext';

type FormTypeProps = {
  formType: string;
  className: string;
}

const FormOpenButton: FC<FormTypeProps> = ({ formType, className }) => {
  const appContext = useContext(AppContext);
  const { setFormOpen, setFormType } = appContext;

  const handleFormOpen = (formType: string) => {
    setFormOpen(true);
    setFormType(formType);
  }

  return (
    <Button onClick={() => handleFormOpen(formType)} className={className}>
      {formType === 'stackCreate' ? <AddIcon className='text-white'/> : <AddIcon className='text-white'/>}
    </Button>
  )
}

export default FormOpenButton
