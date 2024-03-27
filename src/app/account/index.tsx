import WithAuth from "@/components/WithAuth";
import AccountPage from "./page";

const routers = [
  {
    path: "account",
    element: (
      <WithAuth>
        <AccountPage />
      </WithAuth>
    ),
  },
];

export default routers;
