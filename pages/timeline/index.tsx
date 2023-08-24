import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import StackList from '@/components/molecules/StackList'
import FormModal from '@/components/molecules/FormModal'

const index: NextPage = () => {
  return (
    <Layout>
      <StackList />
      <FormModal />
    </Layout>
  )
}

export default index
