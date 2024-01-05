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
    <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>積み上げスキル</div>
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
