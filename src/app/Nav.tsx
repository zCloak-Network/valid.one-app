import React from "react";
import IDIcon from "@/assets/svg/icon/icon_id_n.svg?react";
import ConnexIcon from "@/assets/svg/icon/icon_connex.svg?react";
import SignIcon from "@/assets/svg/icon/icon_sign.svg?react";
import ProfileIcon from "@/assets/svg/icon/icon_profile.svg?react";
import IDAcIcon from "@/assets/svg/icon/icon_id_s.svg?react";
import ConnexAcIcon from "@/assets/svg/icon/icon_connex_s.svg?react";
import SignAcIcon from "@/assets/svg/icon/icon_sign_s.svg?react";
import ProfileAcIcon from "@/assets/svg/icon/icon_profile_s.svg?react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

interface NavTab {
  label: string;
  pathname: string;
  activeIcon: React.ReactNode;
  unActiveIcon: React.ReactNode;
}

const navTabs: NavTab[] = [
  {
    label: "ID",
    pathname: "/id",
    activeIcon: <IDAcIcon />,
    unActiveIcon: <IDIcon />,
  },
  // {
  //   label: "ConneX",
  //   pathname: "/connex",
  //   activeIcon: <ConnexAcIcon />,
  //   unActiveIcon: <ConnexIcon />,
  // },
  {
    label: "Sign",
    pathname: "/sign",
    activeIcon: <SignAcIcon />,
    unActiveIcon: <SignIcon />,
  },
  {
    label: "Account",
    pathname: "/account",
    activeIcon: <ProfileAcIcon />,
    unActiveIcon: <ProfileIcon />,
  },
];

const hiddenPaths = ["/id/:validId", "/id/profile/edit"];

const Nav = () => {
  const location = useLocation();
  const pathNow = location.pathname;
  const navigate = useNavigate();

  const shouldHideNav = hiddenPaths.some((pathPattern) =>
    matchPath({ path: pathPattern, end: true }, pathNow)
  );

  return (
    <div
      className={`relative z-10 h-20 bg-[#fcfdfd] ${
        shouldHideNav ? "hidden" : "block"
      } px-3`}
      style={{
        boxShadow: "0 4px 10px 4px #e5e7eb ",
      }}
    >
      <nav className="flex mx-auto max-w-md p-4 justify-between">
        {navTabs.map(({ pathname, activeIcon, unActiveIcon, label }) => {
          const isActive = pathNow.indexOf(pathname) === 0;
          return (
            <span
              key={label}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-700" : "text-slate-400"
              }`}
              onClick={() => navigate(pathname)}
            >
              {isActive ? activeIcon : unActiveIcon}
              <span className="my-1">{label}</span>
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
