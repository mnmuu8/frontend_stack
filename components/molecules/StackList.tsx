import React, { FC, useState, useEffect } from 'react'
import StackCard from '@/components/molecules/StackCard';
import SelectBox from './SelectBox';
import { SelectChangeEvent } from '@mui/material/Select';
import { getSession } from '@/utiliry/session';
import { ApiOptions, StackProps } from '@/types/types';
import axios from 'axios';

const StackList: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('all');
  const [filteredStackLists, setFilteredStackLists] = useState<StackProps[]>([]);
  const [stacks, setStacks] = useState<StackProps[]>([])

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;
 
    const options: ApiOptions<{user_id: number}> = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      },
      params: {
        user_id: sessionData.userId
      }
    }
    axios.get(`${process.env.API_ROOT_URL}/api/v1/stacks`, options)
    .then(response => {
      const { data } = response;
      setStacks(data.stacks);
    })
    .catch(error => {
      if (error.response) {
        const { data } = error.response;
        throw new Error(`${JSON.stringify(data)}`);
      } else {
        throw new Error(`${JSON.stringify(error)}`);
      }
    });
  }, [])

  // TODO: 一旦仮で作成。後ほど項目増やしてフィルターかけて表示する
  useEffect(() => {
    const filterStackLists = () => {
      if (selectedOption === 'following') {
        setFilteredStackLists(stacks.filter((list) => list.id === 1));
      } else if (selectedOption === 'notFollowing') {
        setFilteredStackLists(stacks.filter((list) => list.id === 2));
      } else {
        setFilteredStackLists(stacks);
      }
    };

    filterStackLists();
  }, [stacks, selectedOption]);

  return (
    <div className='w-full max-w-[980px] m-auto pb-10'>
      <div className='mb-4'>
        <SelectBox selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
      </div>
      <div>
        {filteredStackLists.map((stack) => (
          <StackCard key={stack.id} stack={stack} />
        ))}
      </div>
      <div className='w-[280px] m-auto mt-10 rounded-md border-2 cursor-pointer border-gray-200 text-center text-sm py-3 duration-300 hover:bg-gray-50 hover:duration-300'>もっとみる</div>
    </div>
  )
}

export default StackList
