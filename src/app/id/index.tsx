import WithAuth from "@/components/WithAuth";
import IdPage from "./page";
import EditProfile from "./profile/edit/page";
import { default as User, loader } from "./user/page";
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
        path: ":validId",
        element: <User />,
        loader,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
    ],
  },
];

export default routers;
