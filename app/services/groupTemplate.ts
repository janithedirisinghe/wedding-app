import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../utils/prisma';


// Function to create a template
export const createMyTemplate = async (data: any) => {
    return await prisma.groupTemplate.create({ data });
};

// Function to fetch all templates
export const getMyTemplatesByUserId = async (userId:number) => {
    return await prisma.groupTemplate.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            firstName: true,
            secondName: true,
        }
    });
};

// API Route handler for POST (create template)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = req.body; // Extract form data from request body
            const template = await createMyTemplate(data); // Call create function

            // Respond with the created template
            res.status(201).json({
                success: true,
                data: template,
            });
        } catch (error) {
            console.error("Error creating template:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create template",
            });
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
