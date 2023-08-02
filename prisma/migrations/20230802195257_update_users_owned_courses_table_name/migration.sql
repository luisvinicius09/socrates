/*
  Warnings:

  - You are about to drop the `user_owned_courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_owned_courses" DROP CONSTRAINT "user_owned_courses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "user_owned_courses" DROP CONSTRAINT "user_owned_courses_userId_fkey";

-- DropTable
DROP TABLE "user_owned_courses";

-- CreateTable
CREATE TABLE "users_owned_courses" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "users_owned_courses_pkey" PRIMARY KEY ("userId","courseId")
);

-- AddForeignKey
ALTER TABLE "users_owned_courses" ADD CONSTRAINT "users_owned_courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_owned_courses" ADD CONSTRAINT "users_owned_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
