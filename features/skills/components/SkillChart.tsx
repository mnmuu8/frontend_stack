import Chart from '@/components/ui-parts/Chart'
import React, { FC } from 'react'

const SkillChart: FC<{ pieLabels: string[], pieData: number[] }> = ({ pieLabels, pieData }) => {
  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>積み上げスキル</div>
      <div className='p-6 pb-10 flex justify-center'>
        <div className='w-[50%]'>
          <Chart
            labels={pieLabels}
            label={'学習時間'}
            data={pieData}
            bdColor={['rgb(39, 119, 169)']}
            bgColor={['rgb(240, 248, 250)']}
            bdwidth={1}
            text={'積み上げスキル'}
            type={'pie'}
            pattern={'StackSkillGraph'}
          />
        </div>
      </div>
    </div>
  )
}

export default SkillChart
