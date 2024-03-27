import SignLayout from "./layout";
import Signer from "./signer/page";
import Verifier from "./verifier/page";

const routers = [
  {
    path: "sign",
    element: <SignLayout />,
    children: [
      {
        path: "signer",
        element: <Signer />,
      },
      {
        path: "verifier",
        children: [
          {
            path: ":uuid",
            element: <Verifier />,
          },
          {
            path: "",
            element: <Verifier />,
          },
        ],
      },
    ],
  },
];

export default routers;
