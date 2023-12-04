import React, { FC, useEffect, useState } from 'react';
import { tabInfo, skillData } from '../../sample';
import StackCard from '../molecules/StackCard';
import ProfileCard from '../molecules/ProfileCard';
import axios from 'axios';
import { getSession } from '@/utiliry/session';
import { StackProps } from '@/types/stack';
import { getApiHeadersWithUserId } from '@/utiliry/api';
import Chart from '../uikit/Chart';

const MyPageWrapper: FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [innerTab, setInnerTab] = useState('allStack');
  const [stacks, setStacks] = useState<StackProps[]>([]);

  const [skills, setSkills] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setInnerTab(tabInfo[tab].tabs[0].id);
  };
  const handleInnerTabClick = (tab: string) => {
    setInnerTab(tab);
  };

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeadersWithUserId(sessionData);
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
  }, []);

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
    <div className='flex justify-between w-[80%] m-auto'>
      <ProfileCard />
      <div className='w-[calc(100%-340px)]'>
        <div className='bg-gray-50 mb-8'>
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
              pattern={3}
            />
          </div>
          <div className='py-6 flex items-center justify-center bg-gray-100'>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-bronze mr-1'></span>
              <span className='text-sm'>ブロンズ</span>
            </div>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-silver mr-1'></span>
              <span className='text-sm'>シルバー</span>
            </div>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-gold mr-1'></span>
              <span className='text-sm'>ゴールド</span>
            </div>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-platinum mr-1'></span>
              <span className='text-sm'>プラチナ</span>
            </div>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-diamond mr-1'></span>
              <span className='text-sm'>ダイヤモンド</span>
            </div>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-master mr-1'></span>
              <span className='text-sm'>マスター</span>
            </div>
            <div className='flex items-center mr-4'>
              <span className='w-3 h-3 block bg-legend mr-1'></span>
              <span className='text-sm'>レジェンド</span>
            </div>
          </div>
        </div>
        <div className='flex text-sm mb-8'>
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
        </div>
        <div className='bg-gray-50 rounded-md shadow-md'>
          <div className='flex px-10 border-b-2 text-sm'>
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
          </div>
          <div className='MyPage-stacklist'>
            {stacks.map((stack) => (
              <StackCard key={stack.id} stack={stack} />
            ))}
          </div>
        </div>
        <div className='w-[280px] m-auto mt-10 rounded-md border-2 cursor-pointer border-gray-200 text-center text-sm py-3 duration-300 hover:bg-gray-50 hover:duration-300'>
          もっとみる
        </div>
      </div>
    </div>
  );
};

export default MyPageWrapper;
