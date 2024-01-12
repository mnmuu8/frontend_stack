import React, { FC } from 'react';
import StackCard from './StackCard';
import { StackProps } from '../types/stack';

const StackMyList: FC<{ stacks: StackProps[] }> = ({ stacks }) => {
  return (
    <div className='SectionContainer'>
      <div className='SectionHeading'>自分の積み上げ</div>
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

export default StackMyList;
