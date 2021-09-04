/*
  Warnings:

  - You are about to drop the column `productId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "productId",
DROP COLUMN "comment",
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "payload" TEXT NOT NULL;
