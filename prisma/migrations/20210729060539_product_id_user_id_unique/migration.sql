/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interest.productId_userId_unique" ON "Interest"("productId", "userId");
