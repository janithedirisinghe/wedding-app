/*
  Warnings:

  - You are about to drop the column `templateId` on the `group` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `invite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_templateId_fkey`;

-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_userId_fkey`;

-- DropForeignKey
ALTER TABLE `invite` DROP FOREIGN KEY `Invite_groupId_fkey`;

-- AlterTable
ALTER TABLE `group` DROP COLUMN `templateId`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `invite` DROP COLUMN `groupId`;
