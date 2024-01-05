import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import Layout from '@/components/layouts/Layout'
import ProfileCard from '@/features/users/components/ProfileCard'
import StackMyList from '@/features/stacks/components/StackMyList'
import SkillRankChart from '@/features/skills/components/SkillRankChart'
import { StackProps } from '@/features/stacks/types/stack'
import { SessionContext } from '@/context/SessionContext'
import { getApiHeadersWithUserId } from '@/common/functions/api'

const Index: NextPage = () => {
  const [stacks, setStacks] = useState<StackProps[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);

  const { sessionUser } = useContext(SessionContext);

  useEffect(() => {
    const options = getApiHeadersWithUserId();
    const url = `${process.env.API_ROOT_URL}/api/v1/stacks`;
    axios.get(url, options)
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
    <Layout>
      <div className='max-w-[1020px] m-auto'>
        <ProfileCard />
        <StackMyList stacks={stacks} />
        <SkillRankChart skills={skills} minutes={minutes} />
      </div>
    </Layout>
  )
}

export default Index
