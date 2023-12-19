import React from 'react';
import axios from 'axios';
import Layout from '@/components/organisms/Layout';
import OutputsWrapper from '@/components/templates/OutputsWrapper';
import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';
import { getNextApiHeaders } from '@/utiliry/api';
import { OutputsProps } from '@/types/output';

const Index: NextPage<OutputsProps> = ({ outputs }) => {
  return (
    <div>
      <Layout>
        <OutputsWrapper outputs={outputs} />
      </Layout>
    </div>
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
