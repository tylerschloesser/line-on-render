import { getAuth } from "@clerk/nextjs/server";
import * as trpcNext from "@trpc/server/adapters/next";
import invariant from "tiny-invariant";

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const auth = getAuth(opts.req);
  // middleware requires auth, so user should be signed in
  invariant(auth.userId);
  return { auth };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
