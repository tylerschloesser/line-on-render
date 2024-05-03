import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function Home() {
  const items = trpc.listItems.useQuery();

  return (
    <div>
      Hello World. <Link href="/about">About</Link>
      <div>
        <>{items.data === undefined && "Loading ..."}</>
        <>{items.data?.length === 0 && "No items..."}</>
        <>
          {items.data && items.data.length > 0 && (
            <ul>
              {items.data.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
        </>
      </div>
    </div>
  );
}
