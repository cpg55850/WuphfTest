/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `WuphfUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wuphf" DROP CONSTRAINT "Wuphf_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "WuphfUser_userName_key" ON "WuphfUser"("userName");

-- AddForeignKey
ALTER TABLE "Wuphf" ADD CONSTRAINT "Wuphf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "WuphfUser"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
