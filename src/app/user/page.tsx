import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

import { observer } from "@/store";

export async function loader({ params }: LoaderFunctionArgs) {
  const { validId } = params;

  return { validId };
}

export default observer(function User() {
  const { validId } = useLoaderData() as { validId: string };

  return (
    <div className="flex-1">
      <div>User: {validId}</div>
    </div>
  );
});
