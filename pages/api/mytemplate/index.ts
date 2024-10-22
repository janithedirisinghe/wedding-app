import { createMyTemplate, getMyTemplatesByUserId } from '@/app/services/groupTemplate';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
           try{
            const {userId} = req.query;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const templates = await getMyTemplatesByUserId(Number(userId));

            // Respond with the fetched templates
            return res.status(200).json(templates);
           }catch{}
        }
        if (req.method === 'POST') {
            const templateData = req.body;
            const createdTemplate = await createMyTemplate(templateData);
            return res.status(201).json(createdTemplate.id);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error creating template:', error);
        return res.status(500).json({ error: 'Failed to create template' });
    }
}
