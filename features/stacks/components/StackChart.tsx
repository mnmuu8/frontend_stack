import Chart from '@/components/ui-parts/Chart'
import React, { FC } from 'react'

const StackChart: FC<{ barLabels: string[], barData: number[], currentMonth: number}> = ({ barLabels, barData, currentMonth}) => {
  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>積み上げ時間</div>
      <div className='px-6 pt-6 pb-10'>
        <Chart
          labels={barLabels}
          label={'時間'}
          data={barData}
          bdColor={['rgb(39, 119, 169)']}
          bgColor={['rgb(240, 248, 250)']}
          bdwidth={1}
          text={currentMonth + '月の学習時間'}
          type={'bar'}
          pattern={'StackTimeGraph'}
        />
      </div>
    </div>
  )
}

export default StackChart
