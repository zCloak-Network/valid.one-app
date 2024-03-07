"use client";

import { default as useStore, observer } from "@/store";

export default observer(function HomePage({
  params,
}: {
  params: { "valid-id": string };
}) {
  const { User } = useStore();
  return (
    <div className="text-center">
      <div>User: {params["valid-id"]}</div>
      <div>User ID: {User.id}</div>
    </div>
  );
});
