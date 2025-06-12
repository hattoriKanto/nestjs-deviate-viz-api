/*
  Warnings:

  - The primary key for the `daily_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eid` on the `daily_logs` table. All the data in the column will be lost.
  - Added the required column `EID` to the `daily_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "daily_logs" DROP CONSTRAINT "daily_logs_pkey",
DROP COLUMN "eid",
ADD COLUMN     "EID" INTEGER NOT NULL,
ADD CONSTRAINT "daily_logs_pkey" PRIMARY KEY ("EID");
