/*
  Warnings:

  - You are about to drop the `_SearchTermToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `SearchTerm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SearchTermToUser" DROP CONSTRAINT "_SearchTermToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SearchTermToUser" DROP CONSTRAINT "_SearchTermToUser_B_fkey";

-- DropIndex
DROP INDEX "SearchTerm.word_unique";

-- AlterTable
ALTER TABLE "SearchTerm" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_SearchTermToUser";

-- AddForeignKey
ALTER TABLE "SearchTerm" ADD FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
