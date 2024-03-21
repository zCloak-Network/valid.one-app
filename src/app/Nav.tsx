import React from "react";
import IDIcon from "@/assets/svg/icon/icon_id_n.svg?react";
import ConnexIcon from "@/assets/svg/icon/icon_connex.svg?react";
import SignIcon from "@/assets/svg/icon/icon_sign.svg?react";
import ProfileIcon from "@/assets/svg/icon/icon_profile.svg?react";
import IDAcIcon from "@/assets/svg/icon/icon_id_s.svg?react";
import ConnexAcIcon from "@/assets/svg/icon/icon_connex_s.svg?react";
import SignAcIcon from "@/assets/svg/icon/icon_sign_s.svg?react";
import ProfileAcIcon from "@/assets/svg/icon/icon_profile_s.svg?react";
import { matchPath } from "react-router-dom";

interface NavTab {
  label: string;
  pathname: string;
  activeIcon: React.ReactNode;
  unActiveIcon: React.ReactNode;
}

const navTabs: NavTab[] = [
  {
    label: "ID",
    pathname: "/id/",
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
    pathname: "/sign/",
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

const hiddenPaths = ["/login", "/user/:validId"];

const Nav = () => {
  const pathNow = location.pathname;

  const shouldHideNav = hiddenPaths.some((pathPattern) =>
    matchPath(pathPattern, pathNow)
  );

  return (
    <div
      className={`h-20 bg-white shadow-lg ${
        shouldHideNav ? "hidden" : "block"
      } px-3`}
    >
      <nav className="flex mx-auto max-w-md p-4 justify-between">
        {navTabs.map(({ pathname, activeIcon, unActiveIcon, label }) => {
          const isActive = pathNow === pathname;
          return (
            <a
              key={label}
              href={pathname}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-700" : "text-slate-400"
              }`}
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
