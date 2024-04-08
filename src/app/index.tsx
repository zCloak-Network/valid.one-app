import RootLayout from "./layout";

import LandingPage from "./page";
import Login from "./login";
import NoFound from "./not-found";
import Id from "./id";
import Sign from "./sign";
import Account from "./account";
import Explorer from "./explorer";

const rootRouter = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        index: true,
      },
      ...Id,
      ...Sign,
      ...Account,
    ],
  },
  ...Login,
  {
    path: "*",
    element: <NoFound />,
  },
  ...Explorer,
];

export default rootRouter;
