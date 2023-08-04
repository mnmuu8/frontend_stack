import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import StackList from '@/components/molecules/StackList'

const index: NextPage = () => {
  return (
    <Layout>
      <StackList />
    </Layout>
  )
}

export default index
