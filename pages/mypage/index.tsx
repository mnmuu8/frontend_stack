import React from 'react'
import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import MyPageWrapper from '@/components/templates/MyPageWrapper'
import FormModal from '@/components/molecules/FormModal'

const index: NextPage = () => {
  return (
    <Layout>
      <MyPageWrapper />
      <FormModal />
    </Layout>
  )
}

export default index
