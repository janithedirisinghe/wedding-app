import prisma from '../utils/prisma';

export const getAllInvites = async () => {
  return await prisma.invite.findMany();
};

export const createInvite = async (data: any) => {
  return await prisma.invite.create({ data });
};

// Add more functions for updating or deleting invites

// Add more functions for updating or deleting invites
