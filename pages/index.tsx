import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/layouts/Layout'
import StackChart from '@/features/stacks/components/StackChart';
import RankTable from '@/features/skills/components/RankTable';
import { StackProps } from '@/features/stacks/types/stack';
import { getApiHeadersWithUserId } from '@/common/functions/api';
import SkillChart from '@/features/skills/components/SkillChart';

const Index: NextPage = () => {
  const [stacks, setStacks] = useState<StackProps[]>([]);
  const [barData, setBarData] = useState<number[]>([]);
  const [pieData, setPieData] = useState<number[]>([]);
  const [pieLabels, setPieLabels] = useState<string[]>([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const daysInMonth = currentDate.getDate();

  const barLabels = useMemo(() => {
    const stackLabels: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      stackLabels.push(i.toString());
    }
    return stackLabels;
  }, [daysInMonth]);

  useEffect(() => {
    const options = getApiHeadersWithUserId();
    const url = `${process.env.API_ROOT_URL}/api/v1/stacks`;

    axios.get(url, options)
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
    <Layout>
      <div className='Container'>
        <StackChart barLabels={barLabels} barData={barData} currentMonth={currentMonth} />
        <SkillChart pieLabels={pieLabels} pieData={pieData} />
        <RankTable />
      </div>
    </Layout>
  )
}

export default Index
