import WithAuth from "@/components/WithAuth";
import IdPage from "./page";

const routers = [
  {
    path: "id",
    element: (
      <WithAuth>
        <IdPage />
      </WithAuth>
    ),
  },
];

export default routers;
