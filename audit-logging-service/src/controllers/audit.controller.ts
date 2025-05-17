import { prisma } from "../db/client";


export const getLogs = async(req: any, res: any) => {
    try {
    const logs = await prisma.auditLog.findMany();
    res.json(logs);
  } catch (error) {
    console.error("❌ Failed to fetch logs:", error);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
}