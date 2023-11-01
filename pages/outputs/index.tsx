import FormModal from '@/components/molecules/FormModal'
import Layout from '@/components/organisms/Layout'
import OutputsWrapper from '@/components/templates/OutputsWrapper'
import { NextPage } from 'next'
import React from 'react'

const index: NextPage = () => {
  return (
    <div>
      <Layout>
        <OutputsWrapper />
        <FormModal />
      </Layout>
    </div>
  )
}

export default index
