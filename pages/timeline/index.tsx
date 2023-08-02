import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import StackLists from '@/components/molecules/StackLists'

const index: NextPage = () => {
  return (
    <Layout>
      <StackLists />
    </Layout>
  )
}

export default index
