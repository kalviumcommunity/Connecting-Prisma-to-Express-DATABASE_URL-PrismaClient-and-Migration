// ─────────────────────────────────────────────────────────────
// Express entry point.
//
// Right now this server works, but its data lives in an in-memory array
// (see routes/threads.js) and vanishes on every restart.
//
// YOUR TASK: connect Prisma + PostgreSQL. Follow the TODOs below.
// You should NOT need to change routes/threads.js or anything in client/.
// ─────────────────────────────────────────────────────────────
import "dotenv/config"; // loads DATABASE_URL from .env before anything reads process.env
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";

import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

// TODO 2: wrap startup in an async function that connects to the database first.
//   - await prisma.$connect();
//   - console.log a clear "Prisma connected" message
//   - THEN app.listen(PORT, ...)
//   A Prisma error here almost always means DATABASE_URL is wrong.

// Replace this plain listen() with the connect-then-listen version above:
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  }
}

startServer();


