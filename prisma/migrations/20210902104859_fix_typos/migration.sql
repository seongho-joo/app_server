/*
  Warnings:

  - You are about to drop the column `prodcutId` on the `ProductReview` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "prodcutId",
ADD COLUMN     "productId" INTEGER NOT NULL;
