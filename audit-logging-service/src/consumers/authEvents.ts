import Redis from "ioredis";
import { prisma } from "../db/client";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6793")
})
export const startAuthEventConsumer = async () => {
  await redis.subscribe("audit-log", () => {
    console.log("✅ Subscribed to audit-log channel");
  });

  redis.on("message", async (channel, message) => {
    if (channel === "audit-log") {
      try {
        const data = JSON.parse(message);
        console.log("📥 Received audit event:", data);

        await prisma.auditLog.create({
          data: {
            service: "auth-service",
            event: data.type || "unknown",
            userId: String(data.userId),
            metadata: data,
          },
        });

        console.log("✅ Audit log saved to DB");
      } catch (err) {
        console.error("❌ Error processing audit event:", err);
      }
    }
  });
};