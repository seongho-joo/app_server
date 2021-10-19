-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "roomId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "authorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CheckList" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "checkList" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckList" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
