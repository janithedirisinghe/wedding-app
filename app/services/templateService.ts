import prisma from '../utils/prisma';

export const getAllTemplaes = async () => {
    return await prisma.template.findMany();
}