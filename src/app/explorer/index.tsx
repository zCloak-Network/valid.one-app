import { Outlet, RouteObject } from "react-router-dom";
import Explorer from "./page";

const routers: RouteObject[] = [
  {
    path: "explorer",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Explorer />,
      },
      { path: ":uuid", element: <Explorer /> },
    ],
  },
];

export default routers;
