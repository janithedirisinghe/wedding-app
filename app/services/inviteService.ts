import prisma from '../utils/prisma';

export const getAllInvites = async () => {
  return await prisma.invite.findMany();
};

export const createInvite = async (data: any) => {
  return await prisma.invite.create({ data });
};

export const getInviteMobileNomberFromId = async (inviteStId: number) => {
  return await prisma.inviteState.findUnique({
    where: {
      inviteStId: inviteStId,
    },
    include: {
      invite: {
        select: {
          phone: true,
        }
      },
      groupTemplate: {
        include: {
          template: {
            select: {
              description: true,
            }
          }
        }
      }
    }
  });
};

export const getInvitesByGroupId = async (groupId: number) => {
  return await prisma.invite.findMany({
    where: {
      groupId,  // Correct variable casing
    },
  });
};

export const createInviteForGroup = async (groupId: number, data: any) => {
  return await prisma.invite.create({
    data: {
      ...data,
      groupId,  // Associate invite with the group
    },
  });
};

export const deleteInviteById = async (id: number) => {
  console.log('Attempting to delete invite with id:', id); // Add logging for troubleshooting
  return await prisma.invite.delete({
    where: {
      id: id,
    },
  });
};