import React, { FC, useContext, useEffect, useState } from 'react';
import StackCard from '../molecules/StackCard';
import ProfileCard from '../molecules/ProfileCard';
import axios from 'axios';
import { StackProps } from '@/types/stack';
import { getApiHeadersWithUserId } from '@/utiliry/api';
import Chart from '../uikit/Chart';
import { SessionContext } from '@/context/SessionContext';

const MyPageWrapper: FC = () => {
  const [stacks, setStacks] = useState<StackProps[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);

  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  // TODO: タブで積み上げの一覧を切り替える機能。後ほど使用する可能性があるので残しておく
  // const [activeTab, setActiveTab] = useState('all');
  // const [innerTab, setInnerTab] = useState('allStack');
  // const handleTabClick = (tab: string) => {
  //   setActiveTab(tab);
  //   setInnerTab(tabInfo[tab].tabs[0].id);
  // };
  // const handleInnerTabClick = (tab: string) => {
  //   setInnerTab(tab);
  // };

  useEffect(() => {
    const options = getApiHeadersWithUserId();
    axios
      .get(`${process.env.API_ROOT_URL}/api/v1/stacks`, options)
      .then((response) => {
        const { data } = response;
        setStacks(data.stacks);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          throw new Error(`${JSON.stringify(data)}`);
        } else {
          throw new Error(`${JSON.stringify(error)}`);
        }
      });
  }, [sessionUser]);

  useEffect(() => {
    const skillAccumulation: { [skill: string]: number } = {};

    stacks.forEach((stack) => {
      const { skill, minutes } = stack;
      if (skillAccumulation[skill.name]) {
        skillAccumulation[skill.name] += minutes;
      } else {
        skillAccumulation[skill.name] = minutes;
      }
    });

    setSkills(Object.keys(skillAccumulation));
    setMinutes(Object.values(skillAccumulation));
  }, [stacks]);

  return (
    <div className='max-w-[1020px] m-auto'>
      <ProfileCard />
      <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
        <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>自分の積み上げ</div>
        {/* TODO: タブで積み上げの一覧を切り替える機能。後ほど使用する可能性があるので残しておく */}
        {/* <div className='flex text-sm mb-8'>
          {Object.keys(tabInfo).map((tab) => (
            <div
              key={tab}
              className={`py-2 px-4 mr-2 rounded-[20px] font-bold shadow-md cursor-pointer hover:opacity-[0.7] transition-all ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tabInfo[tab].label}
            </div>
          ))}
        </div> */}
        {/* <div className='flex px-10 border-b-2 text-sm'>
          {tabInfo[activeTab].tabs.map((tab) => (
            <div
              key={tab.id}
              className={`p-4 cursor-pointer hover:opacity-[0.7] transition-all border-b-4 ${
                innerTab === tab.id ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => handleInnerTabClick(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div> */}
        <div className='py-6'>
          {stacks.map((stack) => (
            <StackCard key={stack.id} stack={stack} />
          ))}
          <div className='pt-4 px-6'>
            <div className='text-sm text-gray-900 py-2 px-4 cursor-pointer inline-block hover:bg-gray-50'>
              もっと表示
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default MyPageWrapper;
