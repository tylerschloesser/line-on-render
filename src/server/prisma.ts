import { PrismaClient } from "@prisma/client";

// https://github.com/trpc/examples-next-prisma-starter/blob/2f4cf8df7db82c24b872d8f870e663de51e63e5e/src/server/prisma.ts

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
