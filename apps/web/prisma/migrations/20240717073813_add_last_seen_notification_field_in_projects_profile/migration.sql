-- AlterTable
ALTER TABLE "ProjectsProfile" ADD COLUMN     "lastSeenNotification" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
