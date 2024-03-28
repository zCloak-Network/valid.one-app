import { Outlet } from "react-router-dom";

import {
  ClassAttributes,
  HTMLAttributes,
  JSX,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

function HeadTab(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Sign",
      route: "signer",
    },
    {
      name: "Verify",
      route: "verifier",
    },
  ];

  useEffect(() => {
    if ("/sign/".indexOf(pathname) === 0) {
      // default router
      navigate(tabs[0].route);
    } else {
      if (pathname.indexOf("/sign/signer") === 0) {
        setActiveTab(0);
      } else if (pathname.indexOf("/sign/verifier") === 0) {
        setActiveTab(1);
      }
    }
  }, [pathname]);

  return (
    <div {...props}>
      <div role="tablist" className="rounded-xl tabs-boxed tabs tabs-lg">
        {tabs.map((tab, index) => (
          <a
            key={"sign_tabs_" + index}
            role="tab"
            className={`tab font-semibold ${
              activeTab === tabs.indexOf(tab)
                ? "tab-active shadow  !bg-white !text-black"
                : ""
            }`}
            onClick={() => navigate(tab.route)}
          >
            {tab.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SignLayout() {
  return (
    <div className="p-4 flex-1">
      <HeadTab className="my-4 px-8" />
      <Outlet />
    </div>
  );
}
