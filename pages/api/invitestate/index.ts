import type { NextApiRequest, NextApiResponse } from 'next';
import { getInviteMobileNomberFromId } from '@/app/services/inviteService';
import { createInviteState } from '@/app/services/invitestateService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      // Fetch invite details by ID
      const invite = await getInviteMobileNomberFromId(Number(id));
      if (!invite) {
        return res.status(404).json({ error: 'Invite not found' });
      }
      return res.status(200).json({ phone: invite.invite.phone, description: invite.groupTemplate.template.description });

    } else if (req.method === 'POST') {
      // Create or update invite data
      const { inviteId, status, groupTemplateId } = req.body;

      if (!inviteId || !status || !groupTemplateId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await createInviteState({
        inviteId,
        status,
        groupTemplateId
      });

      return res.status(200).json({ inviteStId: result.inviteStId });

    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
