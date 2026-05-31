// pages/api/inviteState/[inviteStId].ts


import { updateInviteStatus, getInviteStateByStateID } from '@/app/services/invitestateService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { inviteStId } = req.query;

    if (!inviteStId || isNaN(Number(inviteStId))) {
        return res.status(400).json({ error: 'Invalid inviteStId' });
    }

    const inviteStateId = Number(inviteStId);

    if (req.method === 'GET') {
        try {
            const inviteStateData = await getInviteStateByStateID(inviteStateId);
            if (!inviteStateData) {
                return res.status(404).json({ error: 'Invite state not found' });
            }
            return res.status(200).json(inviteStateData);
        } catch (error) {
            console.error('Error fetching invite state:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'PUT') {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        try {
            const updatedInviteState = await updateInviteStatus(inviteStateId, status);
            return res.status(200).json({
                message: 'Status updated successfully',
                updatedInviteState,
            });
        } catch (error) {
            console.error('Error updating invite status:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
