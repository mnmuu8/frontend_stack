import React from 'react'
import Layout from '@/components/organisms/Layout'
import { NextPage } from 'next'
import StackCard from '@/components/molecules/StackCard';
import SearchBox from '@/components/molecules/SearchBox';
import { stackLists } from '@/sample';

const index: NextPage = () => {
  return (
    <Layout>
      <div className='w-full max-w-[980px] m-auto pb-10'>
        <div className='mb-4'>
          <SearchBox />
        </div>
        <div>
          {stackLists.map((stackList, index) => (
            <StackCard key={index} stack={stackList} />
          ))}
        </div>
        <div className='w-[280px] m-auto mt-10 rounded-md border-2 cursor-pointer border-gray-200 text-center text-sm py-3 duration-300 hover:bg-gray-50 hover:duration-300'>もっとみる</div>
      </div>
    </Layout>
  )
}

export default index
