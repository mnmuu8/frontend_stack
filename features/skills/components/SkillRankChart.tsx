import Chart from '@/components/ui-parts/Chart'
import React, { FC } from 'react'

const SkillRankChart: FC<{ skills: string[], minutes: number[] }> = ({ skills, minutes }) => {
  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>スキルランク</div>
      <div className='p-6'>
        <Chart
          labels={skills}
          label={'時間'}
          data={minutes}
          bdColor={['rgb(39, 119, 169)']}
          bgColor={['rgb(240, 248, 250)']}
          bdwidth={1}
          text={'スキル毎のランク'}
          type={'bar'}
          pattern={'SkillRankGraph'}
        />
      </div>
      <div className='py-6 flex items-center justify-center'>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-bronze mr-1'></span>
          <span className='text-sm'>ブロンズ</span>
          <div className='hoverChild bg-bronze'>0~10,000(分)</div>
        </div>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-silver mr-1'></span>
          <span className='text-sm'>シルバー</span>
          <div className='hoverChild bg-silver'>10,001~30,000(分)</div>
        </div>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-gold mr-1'></span>
          <span className='text-sm'>ゴールド</span>
          <div className='hoverChild bg-gold'>30,001~60,000(分)</div>
        </div>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-platinum mr-1'></span>
          <span className='text-sm'>プラチナ</span>
          <div className='hoverChild bg-platinum'>60,001~100,000(分)</div>
        </div>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-diamond mr-1'></span>
          <span className='text-sm'>ダイヤモンド</span>
          <div className='hoverChild bg-diamond'>100,001~300,000(分)</div>
        </div>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-master mr-1'></span>
          <span className='text-sm'>マスター</span>
          <div className='hoverChild bg-master'>300,001~600,000(分)</div>
        </div>
        <div className='hoverParent'>
          <span className='w-3 h-3 block bg-legend mr-1'></span>
          <span className='text-sm'>レジェンド</span>
          <div className='hoverChild bg-legend'>600,001~700,000(分)</div>
        </div>
      </div>
    </div>
  )
}

export default SkillRankChart
