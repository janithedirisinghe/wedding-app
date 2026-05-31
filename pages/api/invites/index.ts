// pages/api/invites.ts
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllInvites,
  createInvite,
  getInvitesByGroupId,
  createInviteForGroup,
  deleteInviteById
} from '@/app/services/inviteService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle GET requests
    if (req.method === 'GET') {
      // Check if groupId is provided in the query
      const { groupId } = req.query;

      if (groupId) {
        // Fetch invites by groupId
        const invites = await getInvitesByGroupId(parseInt(groupId as string));
        return res.status(200).json(invites);
      } else {
        // Fetch all invites
        const invites = await getAllInvites();
        return res.status(200).json(invites);
      }
    }

    // Handle POST requests
    if (req.method === 'POST') {
      const { groupId } = req.body;

      if (groupId) {
        // Create invite for a specific group
        const invite = await createInviteForGroup(groupId, req.body);
        return res.status(201).json(invite);
      } else {
        // Create a general invite
        const invite = await createInvite(req.body);
        return res.status(201).json(invite);
      }
    }

    // Handle DELETE requests
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      console.log('Received DELETE request for id:', id); // Log the ID
      
      if (id && typeof id === 'string') {
        const inviteId = parseInt(id);
        if (isNaN(inviteId)) {
          return res.status(400).json({ error: 'Invalid invite ID' });
        }
        
        await deleteInviteById(inviteId);
        
        return res.status(200).json({ message: 'Invite deleted successfully' }); // Temporarily returning a success message
      }
      return res.status(400).json({ error: 'Invite ID is required' });
    }
    
    

    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error handling invites request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
