"use client";

import {
  ClassAttributes,
  HTMLAttributes,
  JSX,
  useState,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";

function HeadTab(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>,
) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(
    {
      "/sign/signer": 0,
      "/sign/verifier": 1,
    }[pathname] || 0,
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
      }[pathname] || 0,
    );
  }, [pathname]);

  return (
    <div {...props}>
      <div role="tablist" className="tabs-boxed tabs rounded-xl">
        {tabs.map((tab, index) => (
          <a
            key={"sign_tabs_" + index}
            role="tab"
            className={`tab ${activeTab === tabs.indexOf(tab) ? "tab-active  !bg-white !text-black" : ""}`}
            onClick={() => router.push(tab.route)}
          >
            {tab.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <HeadTab className="my-4 px-8" />
      {children}
    </div>
  );
}
