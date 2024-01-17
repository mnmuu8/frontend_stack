import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/layouts/Layout';
import StackList from '@/features/stacks/components/StackList';
import { StackProps } from '@/features/stacks/types/stack';
import { getSession } from '@/features/sessions/functions/session';
import { ApiOptions } from '@/common/types/api';
import { SessionContext } from '@/context/SessionContext';
import axios from 'axios';

const Index: NextPage = () => {
  const [stacks, setStacks] = useState<StackProps[]>([]);

  const { sessionUser } = useContext(SessionContext);

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
      const url = `${process.env.API_ROOT_URL}/api/v1/stacks`;

      try {
        const response = await axios.get(url, options);
        return response.data.stacks;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchStacks().then((res) => { setStacks(res); });
  }, []);

  return (
    <Layout>
      <div className='Container'>
        <StackList stacks={stacks} />
      </div>
    </Layout>
  );
};

export default Index;
