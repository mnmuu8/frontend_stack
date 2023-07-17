import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import BarChart from '@/components/util/BarChart'
import ArcChart from '@/components/util/ArcChart'
import RankTable from '@/components/util/RankTable'

const Index: NextPage = () => {
  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='text-2xl text-blue-900 font-bold mb-6'>Stacked Graph</div>
        <div className='bg-white shadow-md p-6 w-full mb-10'>
          <div className='w-8/12 m-auto flex justify-center'>
            <BarChart />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='w-[48%] flex flex-col'>
            <div className='text-2xl text-blue-900 font-bold mb-6'>Skill Graph</div>
            <div className='bg-white shadow-md p-6 flex-grow'>
              <div className='w-8/12 m-auto'>
                <ArcChart />
              </div>
            </div>
          </div>
          <div className='w-[48%] flex flex-col'>
            <div className='text-2xl text-blue-900 font-bold mb-6'>Stacking Time Ranking</div>
            <div className='bg-white shadow-md p-6 flex-grow'>
              <RankTable />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index