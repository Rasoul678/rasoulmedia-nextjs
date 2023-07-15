/*
  Warnings:

  - You are about to drop the column `followers` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "followers",
DROP COLUMN "following";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
