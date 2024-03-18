import RootLayout from "./layout";

import Index from "./page";
import NoFound from "./not-found";
import Login from "./login";
import Sign from "./sign";
import User from "./user";

const rootRouter = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      ...Login,
      ...Sign,
      ...User,
    ],
  },
  {
    path: "*",
    element: <NoFound />,
  },
];

export default rootRouter;
