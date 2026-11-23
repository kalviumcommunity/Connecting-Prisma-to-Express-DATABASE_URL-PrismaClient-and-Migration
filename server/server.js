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
import prisma from "./prisma/client.js";
import threadsRouter from "./routes/threads.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

await prisma.$connect();
console.log("✅ Prisma connected to PostgreSQL");

app.listen(PORT, () => {
  console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
});
