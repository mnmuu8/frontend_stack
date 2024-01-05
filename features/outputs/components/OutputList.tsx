import React, { FC, useContext } from 'react'
import { FormContext } from '@/context/FormContext';
import { OutputProps, OutputsProps } from '../types/output';
import OutputCard from './OutputCard';
import AddIcon from '@mui/icons-material/Add';

const OutputList: FC<OutputsProps> = ({ outputs }) => {
  const { setFormOpen, setFormType } = useContext(FormContext);

  const handleNewFormOpen = () => {
    setFormType('createOutput');
    setFormOpen(true);
  };

  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
      <div className='flex justify-between items-center p-6 border-b-2 border-gray-100'>
        <div className='text-md text-gray-700'>アウトプット一覧</div>
        <div
          className='flex items-center border border-gray-300 rounded-full py-1 pl-1 pr-2 cursor-pointer hover:bg-gray-50'
          onClick={handleNewFormOpen}
        >
          <AddIcon className='rounded-full bg-blue-500 text-gray-50' fontSize='small' />
          <div className='text-sm text-gray-700 ml-1'>追加</div>
        </div>
      </div>
      <div className='py-6'>
        { outputs && outputs.length > 0 ? (
          outputs.map((output: OutputProps) => (
            <OutputCard key={output.id} output={output} />
          ))
        ) : (
          <div className='p-6 text-gray-700 text-sm'>アウトプットの投稿がありません</div>
        )}
        { outputs && outputs.length > 10 && (
          <div className='pt-4 px-6'>
            <div className='text-sm text-gray-900 py-2 px-4 cursor-pointer inline-block hover:bg-gray-50'>もっと表示</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputList
