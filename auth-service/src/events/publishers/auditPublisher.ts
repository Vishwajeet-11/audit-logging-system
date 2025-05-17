import Redis from "ioredis";
import { AuditEvent } from "../../types/auditEvent";
const redis = new Redis(); // make sure Redis is running on default port 6379

export const publishAuditEvent = async (event: AuditEvent) => {
  try {
    await redis.publish("audit-log", JSON.stringify(event));
    console.log("✅ Published audit event:", event);
  } catch (error) {
    console.error("❌ Failed to publish audit event:", error);
  }
};
