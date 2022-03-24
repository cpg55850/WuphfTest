/*
  Warnings:

  - The primary key for the `WuphfUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `WuphfUser` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `WuphfUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId]` on the table `WuphfUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `WuphfUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wuphf" DROP CONSTRAINT "Wuphf_userId_fkey";

-- DropIndex
DROP INDEX "WuphfUser_email_key";

-- AlterTable
ALTER TABLE "Follower" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "followerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Wuphf" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WuphfUser" DROP CONSTRAINT "WuphfUser_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
ADD COLUMN     "providerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WuphfUser_providerId_key" ON "WuphfUser"("providerId");

-- AddForeignKey
ALTER TABLE "WuphfUser" ADD CONSTRAINT "WuphfUser_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wuphf" ADD CONSTRAINT "Wuphf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "WuphfUser"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;
