// Express entry point. Load environment variables before Prisma connects.
import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
  try {
    // Do not accept API traffic until PostgreSQL is reachable.
    await prisma.$connect();
    console.log("✅ Prisma connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect Prisma to PostgreSQL:", error);
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

startServer();
