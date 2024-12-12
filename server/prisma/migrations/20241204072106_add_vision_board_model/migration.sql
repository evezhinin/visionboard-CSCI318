-- CreateTable
CREATE TABLE "VisionBoard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "boardData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisionBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisionBoard" ADD CONSTRAINT "VisionBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
