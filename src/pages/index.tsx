import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useState } from "react";

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
      <CreateItem />
    </div>
  );
}

function CreateItem() {
  const [name, setName] = useState("");

  const utils = trpc.useUtils();

  const createItem = trpc.createItem.useMutation({
    async onSuccess() {
      await utils.listItems.invalidate();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createItem.mutateAsync({ name });
      }}
    >
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        disabled={createItem.isPending}
      ></input>
      <button type="submit" disabled={createItem.isPending}>
        Create
      </button>
    </form>
  );
}
