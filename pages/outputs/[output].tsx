
import React from 'react'
import axios from 'axios'
import cookie from "cookie"
import { GetServerSideProps, NextPage } from 'next'
import { getNextApiHeaders } from '@/utiliry/api'
import { OutputCardProps } from '@/types/output'
import { useRouter } from 'next/router'

const Output: NextPage<OutputCardProps> = ({ output }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back()
  }

  return (
    <div className='bg-gray-50 h-[100vh] flex justify-center items-center'>
      <div className='w-[768px] bg-white h-[80vh]'>
        <div className='py-2 px-4 border-b-gray-100 border-b-2'>
          <div className='text-sm cursor-pointer' onClick={handleBack}>＜ 戻る</div>
        </div>
        <div className='p-4'>{output.content}</div>
      </div>
    </div>
  )
}

export default Output


export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    if (!req.headers.cookie) {
      return { props: {} };
    }
  
    const cookies = cookie.parse(req.headers.cookie);
    const token = cookies.access_token;
    const options = getNextApiHeaders(token);
    const id = context.params?.output;

    const response = await axios.get(`${process.env.NEXT_API_ROOT_URL}/api/v1/outputs/${id}`, options);
    const output = response.data;

    return { props: { output } };
  } catch (error) {
    console.error('Error fetching outputs:', error);
    return { props: {} };
  }
}


