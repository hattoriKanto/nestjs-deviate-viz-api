-- AlterTable
ALTER TABLE "daily_logs" ALTER COLUMN "eid" DROP DEFAULT;
DROP SEQUENCE "daily_logs_eid_seq";

-- AlterTable
ALTER TABLE "references" ALTER COLUMN "RowID" DROP DEFAULT;
DROP SEQUENCE "references_RowID_seq";
