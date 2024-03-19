import { default as User, loader } from "./page";

const routers = [
  {
    path: "user/:validId",
    element: <User />,
    loader,
  },
];

export default routers;
