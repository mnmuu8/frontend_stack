import React, { FC, useContext } from 'react';
import StackCard from './StackCard';
import { StackProps } from '../types/stack';
import { SessionContext } from '@/context/SessionContext';

const StackList: FC<{ stacks: StackProps[] }> = ({ stacks }) => {
  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  if (!sessionUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-[1020px] m-auto bg-white rounded-md shadow-sm border border-gray-300'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>
        「チーム{sessionUser.team.id}」の積み上げ一覧
      </div>
      <div className='py-6'>
        {stacks.map((stack) => (
          <StackCard key={stack.id} stack={stack} />
        ))}
        <div className='pt-4 px-6'>
          <div className='text-sm text-gray-900 py-2 px-4 cursor-pointer inline-block hover:bg-gray-50'>もっと表示</div>
        </div>
      </div>
    </div>
  );
};

export default StackList;
