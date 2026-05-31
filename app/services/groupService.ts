// app/services/groupService.ts
import prisma from '../utils/prisma';

// Service to create a new group
export const createGroup = async (groupData: { name: string, description: string, userId: number }) => {
  try {
    const newGroup = await prisma.group.create({
      data: {
        name: groupData.name,
        description: groupData.description,
        userId: groupData.userId, // Directly assign userId instead of using a nested user object
      },
    });
    return newGroup;
  } catch (error) {
    console.error('Error creating group:', error);
    throw new Error('Failed to create group');
  }
};

// Service to delete a group by ID
export const deleteGroupById = async (groupId: number) => {
  return await prisma.group.delete({
    where: {
      id: groupId,
    },
  });
};

// Optional: Service to fetch all groups (if needed)
export const getAllGroups = async () => {
  return await prisma.group.findMany();
};

// Optional: Service to fetch a group by ID (if needed)
export const getGroupById = async (groupId: number) => {
  return await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });
};
