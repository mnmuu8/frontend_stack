import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/organisms/Layout';
import StackList from '@/components/molecules/StackList';
import { StackProps } from '@/types/stack';
import { getSession } from '@/utiliry/session';
import { ApiOptions } from '@/types/api';
import { SessionContext } from '@/context/SessionContext';
import axios from 'axios';

const Index: NextPage = () => {
  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const [stacks, setStacks] = useState<StackProps[]>([]);

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    const fetchStacks = async () => {
      const options: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`,
        },
        params: { team_id: sessionUser?.team.id },
      };
      const url = `${process.env.API_ROOT_URL}/api/v1/stacks`;

      try {
        const response = await axios.get(url, options);
        return response.data.stacks;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    const fetchData = async () => {
      const fetchedStacks = await fetchStacks();
      setStacks(fetchedStacks);
    };

    fetchData();
  }, [sessionUser]);

  return (
    <Layout>
      <StackList stacks={stacks} />
    </Layout>
  );
};

export default Index;
