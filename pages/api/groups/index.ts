// pages/api/groups.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createGroup, deleteGroupById, getAllGroups } from '@/app/services/groupService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle GET requests to fetch all groups
    if (req.method === 'GET') {
      const groups = await getAllGroups();
      return res.status(200).json(groups);
    }

    // Handle POST requests to create a new group
    if (req.method === 'POST') {
      const group = await createGroup(req.body);
      return res.status(201).json(group);
    }

    // Handle DELETE requests to delete a group by ID
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (id) {
        await deleteGroupById(parseInt(id as string));
        return res.status(204).end(); // No content response
      }
      return res.status(400).json({ error: 'Group ID is required' });
    }

    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error handling groups request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
