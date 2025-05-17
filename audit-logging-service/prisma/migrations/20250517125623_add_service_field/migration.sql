/*
  Warnings:

  - Added the required column `service` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audit"."AuditLog" ADD COLUMN     "service" TEXT NOT NULL;
