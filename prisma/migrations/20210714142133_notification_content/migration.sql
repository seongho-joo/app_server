/*
  Warnings:

  - You are about to drop the column `cotent` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `content` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "cotent",
ADD COLUMN     "content" TEXT NOT NULL;
