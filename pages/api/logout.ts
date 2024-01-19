import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly; Secure; SameSite=Strict');
  res.status(200).json({ message: 'ログアウトに成功しました。' });
}
