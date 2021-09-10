-- AlterTable
ALTER TABLE "ProductReview" ADD COLUMN     "nondisclosure" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "hide" SET DEFAULT true;

-- AlterTable
ALTER TABLE "UserReview" ADD COLUMN     "nondisclosure" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "hide" SET DEFAULT true;
