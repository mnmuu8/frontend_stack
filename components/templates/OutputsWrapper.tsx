import React, { FC, useContext, useEffect, useState } from 'react'
import { FormContext } from '@/context/FormContext';
import { OutputProps } from '@/types/output';
import { getApiHeaders } from '@/utiliry/api';
import { callGetOutpus } from '@/utiliry/api/outputs';
import { getSession } from '@/utiliry/session';
import OutputCard from '../molecules/OutputCard';

const OutputsWrapper: FC = () => {
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType, isRegisterEvent } = formContext;

  const [outputs, setOutputs] = useState<OutputProps[]>([]);

  const handleFormOpen = () => {
    setFormType('createOutput');
    setFormOpen(true);
  }

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders(sessionData);
    callGetOutpus({options, setOutputs})
  }, [isRegisterEvent])

  return (
    <div className='w-full max-w-[980px] m-auto pb-10'>
      <button className='block bg-blue-500 text-blue-100 hover:bg-blue-600 text-sm font-bold rounded-full p-2 ml-auto w-[150px] text-center cursor-pointer' onClick={handleFormOpen}>アウトプット追加</button>
      <div className='flex justify-between flex-wrap mt-8'>
        {outputs.map((output) => (
          <OutputCard key={output.id} output={output} />
        ))}
      </div>
    </div>
  )
}

export default OutputsWrapper
