import React, { FC } from 'react'
import Chart from '@/components/ui-parts/Chart'
import { getChartData, getChartOption } from '@/common/functions/chart'

const StackChart: FC<{ barLabels: string[], barData: number[], currentMonth: number}> = ({ barLabels, barData, currentMonth}) => {
  const text = currentMonth + '月の学習時間'
  const data = getChartData({
    labels: barLabels,
    label: '時間',
    data: barData,
    bgColor: ['rgb(240, 248, 250)'],
    bdColor: ['rgb(39, 119, 169)'],
    bdWidth: 1
  });
  const option = getChartOption(text)

  return (
    <div className='SectionContainer'>
      <div className='SectionHeading'>積み上げ時間</div>
      <div className='px-6 pt-6 pb-10'>
        <Chart
          data={data}
          option={option}
          type={'bar'}
        />
      </div>
    </div>
  )
}

export default StackChart
