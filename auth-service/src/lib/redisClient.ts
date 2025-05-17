import Redis from "ioredis";
import { AuditEvent } from "../types/auditEvent";

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6793")
})

export const publishAuditEvent = async (data: AuditEvent) => {
  await redis.publish("audit-log", JSON.stringify(data));
};

export default redis;