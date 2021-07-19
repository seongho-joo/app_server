-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationOnOff" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "picture" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
