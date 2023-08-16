import React from 'react'
import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import MyPageWrapper from '@/components/organisms/MyPageWrapper'

const index: NextPage = () => {
  return (
    <Layout>
      <MyPageWrapper />
    </Layout>
  )
}

export default index