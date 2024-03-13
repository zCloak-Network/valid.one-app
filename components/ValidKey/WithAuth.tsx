import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import { default as useStore } from "@/store";

interface WithAuthProps {}

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent: React.FC<P & WithAuthProps> = (props) => {
    const router = useRouter();
    const { User } = useStore();

    useEffect(() => {
      if (!User.id) {
        router.replace("/login");
      }
    }, [router, User]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default WithAuth;
