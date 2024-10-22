// src/pages/api/auth/register.ts
import { createUser } from '@/app/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const user = await createUser(username, email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
