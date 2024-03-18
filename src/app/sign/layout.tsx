import { Outlet } from "react-router-dom";
import {
  ClassAttributes,
  HTMLAttributes,
  JSX,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

function HeadTab(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [activeTab, setActiveTab] = useState(
    {
      "/sign/signer": 0,
      "/sign/verifier": 1,
    }[pathname] || 0
  );

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
    setActiveTab(
      {
        "/sign/signer": 0,
        "/sign/verifier": 1,
      }[pathname] || 0
    );
  }, [pathname]);

  return (
    <div {...props}>
      <div role="tablist" className="rounded-xl tabs-boxed tabs">
        {tabs.map((tab, index) => (
          <a
            key={"sign_tabs_" + index}
            role="tab"
            className={`tab ${
              activeTab === tabs.indexOf(tab)
                ? "tab-active  !bg-white !text-black"
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
    <div className="p-4">
      <HeadTab className="my-4 px-8" />
      <Outlet />
    </div>
  );
}
