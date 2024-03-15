"use client";

import React from "react";
import IDIcon from "@/public/svg/icon/icon_id_n.svg";
import ConnexIcon from "@/public/svg/icon/icon_connex.svg";
import SignIcon from "@/public/svg/icon/icon_sign.svg";
import ProfileIcon from "@/public/svg/icon/icon_profile.svg";
import IDAcIcon from "@/public/svg/icon/icon_id_s.svg";
import ConnexAcIcon from "@/public/svg/icon/icon_connex_s.svg";
import SignAcIcon from "@/public/svg/icon/icon_sign_s.svg";
import ProfileAcIcon from "@/public/svg/icon/icon_profile_s.svg";

import { usePathname, useRouter } from "next/navigation";

interface NavTab {
  label: string;
  pathname: string;
  activeIcon: React.ReactNode;
  unActiveIcon: React.ReactNode;
}

const navTabs: NavTab[] = [
  {
    label: "ID",
    pathname: "/",
    activeIcon: <IDAcIcon />,
    unActiveIcon: <IDIcon />,
  },
  {
    label: "ConneX",
    pathname: "/connex/",
    activeIcon: <ConnexAcIcon />,
    unActiveIcon: <ConnexIcon />,
  },
  {
    label: "Sign",
    pathname: "/sign/signer",
    activeIcon: <SignAcIcon />,
    unActiveIcon: <SignIcon />,
  },
  {
    label: "Account",
    pathname: "/account/",
    activeIcon: <ProfileAcIcon />,
    unActiveIcon: <ProfileIcon />,
  },
];

const Nav = () => {
  const pathNow = usePathname();
  return (
    <div
      className={`fixed inset-x-0 bottom-0 bg-white shadow-lg ${pathNow === "/login" ? "hidden" : "block"} px-3`}
    >
      <nav className="mx-auto flex max-w-md justify-between p-4">
        {navTabs.map(({ pathname, activeIcon, unActiveIcon, label }) => {
          const isActive = pathNow === pathname;
          return (
            <a
              key={label}
              href={pathname}
              className={`flex flex-col items-center text-xs ${isActive ? "text-blue-700" : "text-slate-400"}`}
            >
              {isActive ? activeIcon : unActiveIcon}
              <span className="my-1">{label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
