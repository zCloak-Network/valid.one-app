import { PropsWithChildren } from "react";
import { default as useStore } from "@/store/index";
import { Navigate, useLocation } from "react-router-dom";

const WithAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const store = useStore();
  const location = useLocation();

  return store.User.id ? (
    <>{children}</>
  ) : (
    <Navigate to={{ pathname: "/login", search: `?redirect=${location.pathname}${location.search}` }} />
  );
};
export default WithAuth;
