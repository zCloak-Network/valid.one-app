import LoginPage from "./page";
import RegistPage from "./register/page";
import Layout from "./layout";

const routers = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistPage />,
      },
    ],
  },
];

export default routers;
