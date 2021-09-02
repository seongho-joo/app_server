/*
  Warnings:

  - Changed the type of `sortation` on the `Notice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NoticeSortation" AS ENUM ('EVENT', 'NOTICE');

-- CreateEnum
CREATE TYPE "ReviewSortation" AS ENUM ('PROVIDER', 'RECIVER');

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "sortation",
ADD COLUMN     "sortation" "NoticeSortation" NOT NULL;

-- DropEnum
DROP TYPE "Sortation";

-- CreateTable
CREATE TABLE "UserReview" (
    "id" SERIAL NOT NULL,
    "writerId" INTEGER NOT NULL,
    "reciverId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "organizer" "ReviewSortation" NOT NULL,
    "productId" INTEGER,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "prodcutId" INTEGER NOT NULL,
    "writerId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
