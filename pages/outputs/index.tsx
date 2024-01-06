import React from 'react';
import axios from 'axios';
import cookie from 'cookie';
import Layout from '@/components/layouts/Layout';
import OutputList from '@/features/outputs/components/OutputList';
import { GetServerSideProps, NextPage } from 'next';
import { getNextApiHeaders } from '@/common/functions/api';
import { OutputsProps } from '@/features/outputs/types/output';

const Index: NextPage<OutputsProps> = ({ outputs }) => {
  return (
    <Layout>
      <div className='max-w-[1020px] m-auto'>
        <OutputList outputs={outputs} />
      </div>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    if (!req.headers.cookie) {
      return { props: {} };
    }

    const cookies = cookie.parse(req.headers.cookie);
    const token = cookies.access_token;
    const options = getNextApiHeaders(token);
    const url = `${process.env.NEXT_API_ROOT_URL}/api/v1/outputs`;

    const response = await axios.get(url, options);
    const outputs = response.data.outputs;

    return { props: { outputs } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: {} };
  }
};
