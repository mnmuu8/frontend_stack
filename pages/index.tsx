import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import FormModal from '@/components/molecules/FormModal'
import FormOpenButton from '@/components/atoms/FormOpenButton'
import DashboardWrapper from '@/components/templates/DashboardWrapper'

const index: NextPage = () => {
  return (
    <Layout>
      <DashboardWrapper />
      <FormModal />
      <FormOpenButton formType={'createStack'} className={'fixed bottom-6 right-6 bg-blue-500 p-6 rounded-full hover:bg-blue-400 z-[100]'} />
    </Layout>
  )
}

export default index