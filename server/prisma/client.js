import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// Reuse one PrismaClient instance across imports (and hot reloads in development).
const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
