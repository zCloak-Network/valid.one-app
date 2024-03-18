import Layout from "./layout";
import Signer from "./signer/page";
import Verifier from "./verifier/page";

const routers = [
  {
    path: "sign",
    component: Layout,
    children: [
      {
        path: "signer",
        element: <Signer />,
        index: true,
      },
      {
        path: "verifier",
        element: <Verifier />,
      },
    ],
  },
];

export default routers;
