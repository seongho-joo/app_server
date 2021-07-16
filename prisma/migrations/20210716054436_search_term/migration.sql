-- CreateTable
CREATE TABLE "SearchTerm" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SearchTermToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchTerm.word_unique" ON "SearchTerm"("word");

-- CreateIndex
CREATE UNIQUE INDEX "_SearchTermToUser_AB_unique" ON "_SearchTermToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SearchTermToUser_B_index" ON "_SearchTermToUser"("B");

-- AddForeignKey
ALTER TABLE "_SearchTermToUser" ADD FOREIGN KEY ("A") REFERENCES "SearchTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SearchTermToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
