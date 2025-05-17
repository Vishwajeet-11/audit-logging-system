import { Router } from "express";
import { getLogs } from "../controllers/audit.controller";

const auditRouter = Router();

auditRouter.get("/logs", getLogs);

export default auditRouter;