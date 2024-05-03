import { trpc } from "@/utils/trpc";
import { ClerkProvider } from "@clerk/nextjs";
import { AppType } from "next/app";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default trpc.withTRPC(App);
