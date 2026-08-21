// ─────────────────────────────────────────────────────────────
// Express entry point.
// ─────────────────────────────────────────────────────────────
import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";

// Import the PrismaClient singleton
import prisma from "./prisma/client.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

// Connect to PostgreSQL first, then start Express
async function start() {
  try {
    await prisma.$connect();

    console.log("✅ Prisma connected to the database");

    app.listen(PORT, () => {
      console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
}

start();
