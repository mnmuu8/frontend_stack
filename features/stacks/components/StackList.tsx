import React, { FC, useContext } from 'react';
import StackCard from './StackCard';
import { StackProps } from '../types/stack';
import { SessionContext } from '@/context/SessionContext';

const StackList: FC<{ stacks: StackProps[] }> = ({ stacks }) => {
  const { sessionUser } = useContext(SessionContext);

  if (!sessionUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='SectionContainer'>
      <div className='SectionHeading'>
        「チーム{sessionUser.team.id}」の積み上げ一覧
      </div>
      <div className='py-6'>
        {stacks.map((stack) => (
          <StackCard key={stack.id} stack={stack} />
        ))}
        <div className='pt-4 px-6'>
          <div className='ListMoreButton'>もっと表示</div>
        </div>
      </div>
    </div>
  );
};

export default StackList;
