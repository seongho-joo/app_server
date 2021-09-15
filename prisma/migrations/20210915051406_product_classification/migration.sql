/*
  Warnings:

  - You are about to drop the column `hours` on the `Product` table. All the data in the column will be lost.
  - Added the required column `minutes` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classification` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('LEND', 'RENT');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "hours",
ADD COLUMN     "minutes" INTEGER NOT NULL,
ADD COLUMN     "classification" "Classification" NOT NULL;
