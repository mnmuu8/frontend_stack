import React, { FC } from 'react';
import StackCard from './StackCard';
import { StackProps } from '../types/stack';

const StackMyList: FC<{ stacks: StackProps[] }> = ({ stacks }) => {
  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>自分の積み上げ</div>
      <div className='py-6'>
        {stacks.map((stack) => (
          <StackCard key={stack.id} stack={stack} />
        ))}
        <div className='pt-4 px-6'>
          <div className='text-sm text-gray-900 py-2 px-4 cursor-pointer inline-block hover:bg-gray-50'>
            もっと表示
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackMyList;
