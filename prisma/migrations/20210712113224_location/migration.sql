/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User.phoneNumber_unique";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "fullName",
ADD COLUMN     "userId" SERIAL NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ADD PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
