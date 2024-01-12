import React, { FC } from 'react'
import Chart from '@/components/ui-parts/Chart'
import { getSkillRankChartOption } from '../functions/chart'
import { getChartData } from '@/common/functions/chart'

const SkillRankChart: FC<{ skills: string[], minutes: number[] }> = ({ skills, minutes }) => {
  const text = 'スキル毎のランク'
  const data = getChartData({
    labels: skills,
    label: '時間',
    data: minutes,
    bgColor: ['rgb(240, 248, 250)'],
    bdColor: ['rgb(39, 119, 169)'],
    bdWidth: 1
  });
  const option = getSkillRankChartOption(text, minutes)

  return (
    <div className='SectionContainer'>
      <div className='SectionHeading'>スキルランク</div>
      <div className='p-6'>
        <Chart
          data={data}
          option={option}
          type={'bar'}
        />
      </div>
      <div className='py-6 flex items-center justify-center'>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-bronze'></span>
          <span className='text-sm'>ブロンズ</span>
          <div className='SkillRankTooltip bg-bronze'>0~10,000(分)</div>
        </div>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-silver'></span>
          <span className='text-sm'>シルバー</span>
          <div className='SkillRankTooltip bg-silver'>10,001~30,000(分)</div>
        </div>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-gold'></span>
          <span className='text-sm'>ゴールド</span>
          <div className='SkillRankTooltip bg-gold'>30,001~60,000(分)</div>
        </div>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-platinum'></span>
          <span className='text-sm'>プラチナ</span>
          <div className='SkillRankTooltip bg-platinum'>60,001~100,000(分)</div>
        </div>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-diamond'></span>
          <span className='text-sm'>ダイヤモンド</span>
          <div className='SkillRankTooltip bg-diamond'>100,001~300,000(分)</div>
        </div>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-master'></span>
          <span className='text-sm'>マスター</span>
          <div className='SkillRankTooltip bg-master'>300,001~600,000(分)</div>
        </div>
        <div className='SkillRankIndicator'>
          <span className='SkillRankColor bg-legend'></span>
          <span className='text-sm'>レジェンド</span>
          <div className='SkillRankTooltip bg-legend'>600,001~700,000(分)</div>
        </div>
      </div>
    </div>
  )
}

export default SkillRankChart
