/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "Module";

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
