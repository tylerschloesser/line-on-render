import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  return (
    <div>
      Hello World. <Link href="/about">About</Link>
      <div>{hello.data === undefined ? "Loading..." : hello.data.greeting}</div>
    </div>
  );
}
