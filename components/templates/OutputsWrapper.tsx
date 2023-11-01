import { FormContext } from '@/context/FormContext';
import React, { FC, useContext } from 'react'

const OutputsWrapper: FC = () => {
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const handleFormOpen = () => {
    setFormType('createOutput');
    setFormOpen(true);
  }

  return (
    <div className='w-full max-w-[980px] m-auto pb-10'>
      <button className='block bg-blue-500 text-blue-100 hover:bg-blue-600 text-sm font-bold rounded-full p-2 ml-auto w-[150px] text-center cursor-pointer' onClick={handleFormOpen}>アウトプット追加</button>
    </div>
  )
}

export default OutputsWrapper
