/*
  Warnings:

  - You are about to drop the column `authorId` on the `Wuphf` table. All the data in the column will be lost.
  - Added the required column `postBody` to the `Wuphf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Wuphf` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wuphf" DROP CONSTRAINT "Wuphf_authorId_fkey";

-- AlterTable
ALTER TABLE "Wuphf" DROP COLUMN "authorId",
ADD COLUMN     "postBody" VARCHAR(255) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Wuphf" ADD CONSTRAINT "Wuphf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WuphfUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
