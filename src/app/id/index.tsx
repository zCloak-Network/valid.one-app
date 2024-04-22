import WithAuth from "@/components/WithAuth";
import { Outlet, RouteObject } from "react-router-dom";
import BindPage from "./bind/page";
import IdPage from "./page";
import EditProfile from "./profile/edit/page";
import { default as User, loader } from "./user/page";

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
      {
        path: "bind",
        element: <BindPage />,
      },
    ],
  },
];

export default routers;
