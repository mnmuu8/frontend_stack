import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import DashboardWrapper from '@/components/templates/DashboardWrapper'

const index: NextPage = () => {
  return (
    <Layout>
      <DashboardWrapper />
    </Layout>
  )
}

export default index
