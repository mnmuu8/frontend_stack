import React, { FC, useState, useEffect } from 'react'
import StackCard from '@/components/molecules/StackCard';
import SelectBox from './SelectBox';
import { SelectChangeEvent } from '@mui/material/Select';
import { stackList } from '../../sample';
import { StackListProps } from '../../sample';

const StackList: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('all');
  const [filteredStackLists, setFilteredStackLists] = useState<StackListProps[]>([]);
  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  // TODO: 一旦仮で作成。後ほど項目増やしてフィルターかけて表示する
  useEffect(() => {
    const filterStackLists = () => {
      if (selectedOption === 'following') {
        setFilteredStackLists(stackList.filter((list) => list.id === 1));
      } else if (selectedOption === 'notFollowing') {
        setFilteredStackLists(stackList.filter((list) => list.id === 2));
      } else {
        setFilteredStackLists(stackList);
      }
    };

    filterStackLists();
  }, [selectedOption]);

  return (
    <div className='w-full max-w-[980px] m-auto pb-10'>
      <div className='mb-4'>
        <SelectBox selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
      </div>
      <div>
        {filteredStackLists.map((stackList) => (
          <StackCard key={stackList.id} stack={stackList} />
        ))}
      </div>
      <div className='w-[280px] m-auto mt-10 rounded-md border-2 cursor-pointer border-gray-200 text-center text-sm py-3 duration-300 hover:bg-gray-50 hover:duration-300'>もっとみる</div>
    </div>
  )
}

export default StackList
