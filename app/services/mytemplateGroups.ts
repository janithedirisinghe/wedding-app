import prisma from '../utils/prisma';

export const createTemplateGroup =  async (data: any) => {
    return await prisma.myTemplateGroup.create({ data})
}

export const getGroupTemplatesByGroupTemoplateId = async (groupTemplateId: number) => {
    const templates = await prisma.myTemplateGroup.findMany({
        where: {
            groupTemplateId: groupTemplateId
        },
        select: {
            id: true,
            groupId: true,
            // Select groupName and description from the related Group table
            group: {
                select: {
                    name: true,
                    description: true
                }
            }
        }
    });

    // Map the result to flatten the structure
    return templates.map(template => ({
        id: template.id,
        groupId: template.groupId,
        groupName: template.group.name,
        description: template.group.description
    }));
};