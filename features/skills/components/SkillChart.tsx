import React, { FC } from 'react'
import Chart from '@/components/ui-parts/Chart'
import { getChartData, getChartOption } from '@/common/functions/chart';

const SkillChart: FC<{ pieLabels: string[], pieData: number[] }> = ({ pieLabels, pieData }) => {
  const text = '積み上げスキル'
  const data = getChartData({
    labels: pieLabels,
    label: '学習時間',
    data: pieData,
    bgColor: ['rgb(240, 248, 250)'],
    bdColor: ['rgb(39, 119, 169)'],
    bdWidth: 1
  });
  const option = getChartOption(text)

  return (
    <div className='SectionContainer'>
      <div className='SectionHeading'>積み上げスキル</div>
      <div className='p-6 pb-10 flex justify-center'>
        <div className='w-[50%]'>
          <Chart
            data={data}
            option={option}
            type={'pie'}
          />
        </div>
      </div>
    </div>
  )
}

export default SkillChart
