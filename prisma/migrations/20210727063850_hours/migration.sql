/*
  Warnings:

  - The values [SCHEDULED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `hours` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('WAITING', 'ONGOING', 'COMPLETED');
ALTER TABLE "Product" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Product" ALTER COLUMN "status" SET DEFAULT 'WAITING';
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "hours" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT E'WAITING';
