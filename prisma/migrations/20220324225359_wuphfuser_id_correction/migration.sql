-- DropForeignKey
ALTER TABLE "WuphfUser" DROP CONSTRAINT "WuphfUser_providerId_fkey";

-- AddForeignKey
ALTER TABLE "WuphfUser" ADD CONSTRAINT "WuphfUser_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
