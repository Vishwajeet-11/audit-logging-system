/*
  Warnings:

  - You are about to drop the column `action` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `AuditLog` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audit"."AuditLog" DROP COLUMN "action",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" JSONB NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
