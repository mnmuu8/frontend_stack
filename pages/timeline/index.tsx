import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import StackList from '@/components/molecules/StackList'
import FormModal from '@/components/molecules/FormModal'
import { StackProps } from '@/types/stack'
import { getSession } from '@/utiliry/session'
import { ApiOptions } from '@/types/api'
import { SessionContext } from '@/context/SessionContext'
import axios from 'axios'

const Index: NextPage = () => {
  const [stacks, setStacks] = useState<StackProps[]>([]);
  
  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    const fetchStacks = async () => {
      const options: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`
        },
        params: { team_id: sessionUser?.team.id }
      };
      const url = `${process.env.API_ROOT_URL}/api/v1/stacks`

      try {
        const response = await axios.get(url, options);
        return response.data.stacks;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchStacks().then((res) => { setStacks(res); });
  }, [stacks]);

  return (
    <Layout>
      <div className='text-center text-xl font-bold mb-6'>「チーム{sessionUser?.team.id}」の積み上げ一覧</div>
      <StackList stacks={stacks} />
      <FormModal />
    </Layout>
  )
}

export default Index
