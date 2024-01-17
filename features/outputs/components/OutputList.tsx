import React, { FC, useContext } from 'react'
import { FormContext } from '@/context/FormContext';
import { OutputProps, OutputsProps } from '../types/output';
import OutputCard from './OutputCard';
import AddIcon from '@mui/icons-material/Add';

const OutputList: FC<OutputsProps> = ({ outputs }) => {
  const { setFormOpen, setFormType, setIsRegisterEvent } = useContext(FormContext);

  const handleNewFormOpen = () => {
    setFormType('createOutput');
    setFormOpen(true);
    setIsRegisterEvent(false);
  };

  return (
    <div className='SectionContainer'>
      <div className='flex justify-between items-center p-6 border-b-2 border-gray-100'>
        <div className='text-gray-700'>アウトプット一覧</div>
        <div
          className='ActionBtn'
          onClick={handleNewFormOpen}
        >
          <AddIcon className='AddActionBtnIcon' fontSize='small' />
          <div className='BlackActionBtnLabel'>追加</div>
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
            <div className='ListMoreButton'>もっと表示</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputList
