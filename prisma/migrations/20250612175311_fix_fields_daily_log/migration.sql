/*
  Warnings:

  - The primary key for the `daily_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[EID]` on the table `daily_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "daily_logs_LOGID_key";

-- AlterTable
ALTER TABLE "daily_logs" DROP CONSTRAINT "daily_logs_pkey",
ALTER COLUMN "LOGID" SET DATA TYPE BIGINT,
ADD CONSTRAINT "daily_logs_pkey" PRIMARY KEY ("LOGID");

-- CreateIndex
CREATE UNIQUE INDEX "daily_logs_EID_key" ON "daily_logs"("EID");
