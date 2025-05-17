-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
