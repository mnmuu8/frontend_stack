import React, { FC, useEffect, useState } from 'react'
import Chart from '@/components/uikit/Chart'
import RankTable from '@/components/uikit/RankTable'
import { getSession } from '@/utiliry/session'
import { ApiOptions, StackProps } from '@/types/types'
import axios from 'axios'

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
    const sessionData = getSession();
    if (!sessionData) return;
 
    const options: ApiOptions<{user_id: number}> = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      },
      params: {
        user_id: sessionData.userId
      }
    }

    axios.get(`${process.env.API_ROOT_URL}/api/v1/stacks`, options)
    .then(response => {
      const { data } = response;
      setStacks(data.stacks)

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
      setBarData(aggregatedData)
    })
    .catch(error => {
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
    stacks.forEach(stack => {
      const skillName = stack.skill.name;
      const minutes = stack.minutes;
      skillMinutesMap[skillName] = (skillMinutesMap[skillName] || 0) + minutes;
    });

    const totalMinutes = Object.values(skillMinutesMap).reduce((acc, curr) => acc + curr, 0);
    const skillLabels = Object.keys(skillMinutesMap);
    const skillData = skillLabels.map(label => skillMinutesMap[label] / totalMinutes);

    setPieData(skillData)
    setPieLabels(skillLabels)
  }, [stacks]);

  return (
    <div className='dashboard-page'>
      <div className='text-2xl text-blue-900 font-bold mb-6'>積み上げ時間</div>
      <div className='bg-white shadow-md p-6 w-full mb-10'>
        <div className='w-8/12 m-auto flex justify-center'>
          <Chart labels={barLabels} label={"時間"} data={barData} bdColor={["rgb(39, 119, 169)"]} bgColor={["rgb(240, 248, 250)"]} bdwidth={1} text={currentMonth + "月の学習時間"} type={"bar"} />
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='w-[48%] flex flex-col'>
          <div className='text-2xl text-blue-900 font-bold mb-6'>積み上げスキル</div>
          <div className='bg-white shadow-md p-6 flex-grow'>
            <div className='w-8/12 m-auto'>
            <Chart labels={pieLabels} label={"学習時間"} data={pieData} bdColor={["rgb(39, 119, 169)"]} bgColor={["rgb(240, 248, 250)"]} bdwidth={1} text={"積み上げスキル"} type={"pie"} />
            </div>
          </div>
        </div>
        <div className='w-[48%] flex flex-col'>
          <div className='text-2xl text-blue-900 font-bold mb-6'>積み上げランキング</div>
          <div className='bg-white shadow-md p-6 flex-grow'>
            <RankTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardWrapper
