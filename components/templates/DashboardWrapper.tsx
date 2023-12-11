import React, { FC, useEffect, useState } from 'react';
import Chart from '@/components/uikit/Chart';
import RankTable from '@/components/uikit/RankTable';
import { StackProps } from '@/types/stack';
import axios from 'axios';
import { getApiHeadersWithUserId } from '@/utiliry/api';

const DashboardWrapper: FC = () => {
  const [stacks, setStacks] = useState<StackProps[]>([]);
  const [barData, setBarData] = useState<number[]>([]);
  const [pieData, setPieData] = useState<number[]>([]);
  const [pieLabels, setPieLabels] = useState<string[]>([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const daysInMonth = currentDate.getDate();

  const generateLabels = (daysInMonth: number): string[] => {
    const stackLabels: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      stackLabels.push(i.toString());
    }
    return stackLabels;
  };

  const barLabels = generateLabels(daysInMonth);

  useEffect(() => {
    const options = getApiHeadersWithUserId();
    axios
      .get(`${process.env.API_ROOT_URL}/api/v1/stacks`, options)
      .then((response) => {
        const { data } = response;
        setStacks(data.stacks);

        const aggregatedData = new Array(daysInMonth).fill(0);

        data.stacks.forEach((stack: StackProps) => {
          const stackDate = new Date(stack.stacked_at);
          const stackYear = stackDate.getFullYear();
          const stackMonth = stackDate.getMonth() + 1;
          const stackDay = stackDate.getDate();

          const minutes = stack.minutes;

          if (stackYear === currentYear && stackMonth === currentMonth) {
            aggregatedData[stackDay - 1] += minutes;
          }
        });
        setBarData(aggregatedData);
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
    if (!stacks.length) return;

    const skillMinutesMap: { [key: string]: number } = {};
    stacks.forEach((stack) => {
      const skillName = stack.skill.name;
      const minutes = stack.minutes;
      skillMinutesMap[skillName] = (skillMinutesMap[skillName] || 0) + minutes;
    });

    const totalMinutes = Object.values(skillMinutesMap).reduce((acc, curr) => acc + curr, 0);
    const skillLabels = Object.keys(skillMinutesMap);
    const skillData = skillLabels.map((label) => skillMinutesMap[label] / totalMinutes);

    setPieData(skillData);
    setPieLabels(skillLabels);
  }, [stacks]);

  return (
    <div className='max-w-[1020px] m-auto'>
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
      <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
        <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>積み上げランキング</div>
        <div className='p-6'>
          <RankTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
