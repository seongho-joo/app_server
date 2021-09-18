/*
  Warnings:

  - You are about to drop the column `searchHistoryOnOff` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notificationOnOff` on the `User` table. All the data in the column will be lost.
  - Added the required column `image` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "traderId" INTEGER[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "searchHistoryOnOff",
DROP COLUMN "notificationOnOff";
