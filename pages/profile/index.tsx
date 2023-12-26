import React from 'react'
import { NextPage } from 'next'
import Layout from '@/components/layouts/Layout'
import MyPageWrapper from '@/features/users/components/MyPageWrapper'

const index: NextPage = () => {
  return (
    <Layout>
      <MyPageWrapper />
    </Layout>
  )
}

export default index
