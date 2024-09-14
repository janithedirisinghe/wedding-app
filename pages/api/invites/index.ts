import { createInvite, getAllInvites } from '@/app/services/inviteService';
import { NextApiRequest, NextApiResponse } from 'next';
// import { getAllInvites, createInvite } from '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const invites = await getAllInvites();
    return res.status(200).json(invites);
  }

  if (req.method === 'POST') {
    const invite = await createInvite(req.body);
    return res.status(201).json(invite);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
