/*
  Warnings:

  - Changed the type of `sortation` on the `Notice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizer` on the `UserReview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sortation" AS ENUM ('EVENT', 'NOTICE');

-- CreateEnum
CREATE TYPE "Organizer" AS ENUM ('PROVIDER', 'RECIVER');

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "sortation",
ADD COLUMN     "sortation" "Sortation" NOT NULL;

-- AlterTable
ALTER TABLE "UserReview" DROP COLUMN "organizer",
ADD COLUMN     "organizer" "Organizer" NOT NULL;

-- DropEnum
DROP TYPE "NoticeSortation";

-- DropEnum
DROP TYPE "ReviewSortation";
