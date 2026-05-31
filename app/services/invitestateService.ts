import prisma from '../utils/prisma';

export const createInviteState = async (data:any) => {
    return await prisma.inviteState.create({ data});
}

export const getInviteStateByStateID = async (inviteStId: number) => {
    const result = await prisma.inviteState.findUnique({
        where: {
            inviteStId: inviteStId,
        },
        include: {
            invite: {
                select: {
                    name: true,
                }
            },
            groupTemplate: {
                select: {
                    inviteDate: true,
                    firstName: true,
                    secondName: true,
                    location: true,
                    rsvpDate: true,
                }
            }
        }
    });

    if (!result) return null;

    // Flatten the result
    return {
        inviteStId: result.inviteStId,
        status: result.status,
        createdAt: result.createdAt,
        inviteId: result.inviteId,
        groupTemplateId: result.groupTemplateId,
        inviteName: result.invite.name,
        inviteDate: result.groupTemplate.inviteDate,
        firstName: result.groupTemplate.firstName,
        secondName: result.groupTemplate.secondName,
        location: result.groupTemplate.location,
        rsvpDate: result.groupTemplate.rsvpDate,
    };
};

export const updateInviteStatus = async (inviteStId: number, status: string) => {
    return await prisma.inviteState.update({
        where: { inviteStId },
        data: { status },
    });
};
