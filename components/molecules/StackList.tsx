import React, { FC } from 'react';
import StackCard from '@/components/molecules/StackCard';
import { StackProps } from '@/types/stack';

const StackList: FC<{stacks: StackProps[]}> = ({ stacks }) => {
  return (
    <div className='w-full max-w-[980px] m-auto pb-10'>
      {stacks.map((stack) => (
        <StackCard key={stack.id} stack={stack} />
      ))}
    </div>
  );
};

export default StackList;
