// src/index.ts
import dotenv from "dotenv";
import express from "express";
import { startAuthEventConsumer } from "./consumers/authEvents";
import logsRoute from "./routes/logs.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

// Mount logs route
app.use("/api", logsRoute);

app.listen(PORT, () => {
  console.log(`🚀 Audit Logging Service running on port ${PORT}`);
});

// Start Redis consumer
startAuthEventConsumer();
