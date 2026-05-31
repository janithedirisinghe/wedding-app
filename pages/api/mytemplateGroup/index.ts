//pages/api/mytemplateGroup.ts

import { createTemplateGroup, getGroupTemplatesByGroupTemoplateId } from '@/app/services/mytemplateGroups';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //Handle POST requests to create a new group
        if (req.method === 'POST') {
            const group = await createTemplateGroup(req.body);
            return res.status(201).json(group);
        }

        //Handle GET requests to fetch groups by groupTemplateId
        if (req.method === 'GET') {
            try {
                const { groupTemplateId} = req.query;

                if (!groupTemplateId) {
                    return res.status(400).json({ message: 'Group Template ID is required' });
                }

                const groups = await getGroupTemplatesByGroupTemoplateId(Number(groupTemplateId));

                if (!groups) {
                    return res.status(404).json({ message: 'No groups found for this groupTemplateId' });
                }
    
                // Respond with the fetched groups
                return res.status(200).json(groups);
            } catch {}
        }
    }
    catch (error) {
        console.error('Error handling groups request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}