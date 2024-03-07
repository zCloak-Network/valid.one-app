"use client";

import { default as useStore, observer } from "@/store";

export default observer(function HomePage({
  params,
}: {
  params: { "valid-number": string };
}) {
  const { User } = useStore();
  return (
    <div className="text-center">
      <div>User: {params["valid-number"]}</div>
    </div>
  );
});
