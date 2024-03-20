import WithAuth from "@/components/WithAuth";
import IdPage from "./page";
import EditProfile from "./edit/page";
import { Outlet, RouteObject } from "react-router-dom";

const routers: RouteObject[] = [
  {
    path: "id",
    element: (
      <WithAuth>
        <Outlet />
      </WithAuth>
    ),
    children: [
      {
        index: true,
        element: <IdPage />,
      },
      {
        path: "edit",
        element: <EditProfile />,
      },
    ],
  },
];

export default routers;
