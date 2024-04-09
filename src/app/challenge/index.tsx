import { default as ChallengePage, loader } from "./page";

const routers = [
  {
    path: "challenge/:challengeID",
    element: <ChallengePage />,
    loader,
  },
];

export default routers;
