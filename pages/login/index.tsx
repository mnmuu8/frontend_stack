import { NextPage } from 'next'
import React from 'react'
import LoginForm from '@/components/molecules/LoginForm'

const index: NextPage = () => {
  return (
    <div className='flex items-center justify-center bg-gray-500 h-[100vh] w-full'>
      <LoginForm />
    </div>
  )
}

export default index
