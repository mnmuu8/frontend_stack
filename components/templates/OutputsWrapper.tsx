import React, { FC, useContext } from 'react';
import { FormContext } from '@/context/FormContext';
import OutputCard from '../molecules/OutputCard';
import { OutputProps, OutputsProps } from '@/types/output';

const OutputsWrapper: FC<OutputsProps> = ({ outputs }) => {
  const { setFormOpen, setFormType } = useContext(FormContext);

  const handleFormOpen = () => {
    setFormType('createOutput');
    setFormOpen(true);
  };

  return (
    <div className='w-full max-w-[980px] m-auto pb-10'>
      <button
        className='block bg-blue-500 text-blue-100 hover:bg-blue-600 text-sm font-bold rounded-full p-2 ml-auto w-[150px] text-center cursor-pointer'
        onClick={handleFormOpen}
      >
        アウトプット追加
      </button>
      <div className='flex justify-between flex-wrap mt-8'>
        {outputs && outputs.length > 0 ? (
          outputs.map((output: OutputProps) => <OutputCard key={output.id} output={output} />)
        ) : (
          <p>アウトプットがありません。</p>
        )}
      </div>
    </div>
  );
};

export default OutputsWrapper;
