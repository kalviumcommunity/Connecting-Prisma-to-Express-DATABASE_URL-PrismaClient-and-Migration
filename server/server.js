import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect Prisma:", error.message);
    process.exit(1);
  }
}

startServer();
