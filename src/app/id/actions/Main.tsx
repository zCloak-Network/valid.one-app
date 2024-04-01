import { useStore } from "@/hooks";
import MediumIcon from "@/assets/svg/icon/icon_medium.svg?react";
import XIcon from "@/assets/svg/icon/icon_x.svg?react";
import InsIcon from "@/assets/svg/icon/icon_ins.svg?react";
import DyIcon from "@/assets/svg/icon/icon_dy.svg?react";
import { Link } from "react-router-dom";
import SocialData from "./SocialData";
import Qr from "./Qr";
import Share from "./Share";
export default function () {
  const { User } = useStore();
  return (
    <div className="w-full p-4 bg-gray-800 rounded-3xl shadow">
      <div className="flex items-center justify-between">
        <span className="text-white text-sm font-medium">
          Valid ID: {User.id}
        </span>
      </div>
      <div className="flex items-center justify-between  mt-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-14 rounded-full border border-neutral-400">
              <img src={User.profile?.avatar} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white text-base font-bold">
              {User.profile?.name}
            </span>
            <div className="flex gap-2">
              <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                {/* <MediumIcon /> */}
              </a>
              <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                {/* <XIcon /> */}
              </a>
              <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                {/* <InsIcon /> */}
              </a>
              <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                {/* <DyIcon /> */}
              </a>
            </div>
          </div>
        </div>
        <Link
          to={{ pathname: "profile/edit" }}
          className="btn btn-sm text-neutral-400 text-xs font-bold rounded-lg border border-neutral-400 bg-transparent"
        >
          Edit
        </Link>
      </div>
      <div className="mt-8 mb-4">
        <SocialData />
      </div>
      <div className="flex flex-row items-center w-full gap-4 mb">
        <Qr />
        <Share />
      </div>
    </div>
  );
}
