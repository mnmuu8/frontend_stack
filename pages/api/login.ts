import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body
    const url = `${process.env.NEXT_API_ROOT_URL}/api/login`;

    const response = await axios.post(url, { email, password });
    const { access_token, user_id, exp, role } = response.data;

    res.setHeader('Set-Cookie', `access_token=${access_token}; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Strict`);
    res.status(200).json({ access_token, user_id, exp, role });
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(error.response?.status || 500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
