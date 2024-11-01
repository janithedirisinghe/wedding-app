-- CreateTable
CREATE TABLE `InviteState` (
    `inviteStId` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `inviteId` INTEGER NOT NULL,
    `groupTemplateId` INTEGER NOT NULL,

    PRIMARY KEY (`inviteStId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InviteState` ADD CONSTRAINT `InviteState_inviteId_fkey` FOREIGN KEY (`inviteId`) REFERENCES `Invite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InviteState` ADD CONSTRAINT `InviteState_groupTemplateId_fkey` FOREIGN KEY (`groupTemplateId`) REFERENCES `GroupTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
