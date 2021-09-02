/*
  Warnings:

  - You are about to drop the column `private` on the `UserReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserReview" DROP COLUMN "private",
ADD COLUMN     "hide" BOOLEAN NOT NULL DEFAULT false;
