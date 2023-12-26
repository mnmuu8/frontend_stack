import { NextPage } from 'next'
import Layout from '@/components/layouts/Layout'
import DashboardWrapper from '@/features/stacks/components/DashboardWrapper'

const index: NextPage = () => {
  return (
    <Layout>
      <DashboardWrapper />
    </Layout>
  )
}

export default index
