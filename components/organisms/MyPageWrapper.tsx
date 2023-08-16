import React, { FC, useState } from 'react'
import { stackList, tabInfo, skillData } from '../../sample';
import StackCard from '../molecules/StackCard';
import ProfileCard from '../molecules/ProfileCard';
import UserAuthentication from '../atoms/UserAuthentication';

const MyPageWrapper: FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [innerTab, setInnerTab] = useState('allStack');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setInnerTab(tabInfo[tab].tabs[0].id);
  };
  const handleInnerTabClick = (tab: string) => {
    setInnerTab(tab);
  };

  return (
    <div className='flex justify-between w-[80%] m-auto'>
      <UserAuthentication>
        <ProfileCard/>
      </UserAuthentication>
      <div className='w-[calc(100%-340px)]'>
        <div className='bg-gray-800 text-white rounded-md py-8 px-10 mb-8 shadow-md'>
          <div className='mb-6'>$ analyze @Yu-8chan</div>
          <div className='flex justify-between'>
            {skillData.map((data) => (
              <div key={data.label} className='w-[48%]'>
                <div className='text-green-400 mb-2'>{data.label}:</div>
                <div className='px-6'>
                  {data.data.map((d) => (
                    <div key={d.skill} className='flex justify-between'>
                      <div>{d.skill}:</div>
                      <div className='text-orange-300'>
                        {d.value} {data.label === '積み上げスキル' ? '%' : 'h'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            <UserAuthentication>
              {stackList.map((list) => (
                <StackCard key={list.id} stack={list} />
              ))}
            </UserAuthentication>
          </div>
        </div>
        <div className='w-[280px] m-auto mt-10 rounded-md border-2 cursor-pointer border-gray-200 text-center text-sm py-3 duration-300 hover:bg-gray-50 hover:duration-300'>もっとみる</div>
      </div>
    </div>
  )
}

export default MyPageWrapper