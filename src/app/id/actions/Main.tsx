import { useStore } from "@/hooks";
// import MediumIcon from "@/assets/svg/icon/icon_medium.svg?react";
// import XIcon from "@/assets/svg/icon/icon_x.svg?react";
// import InsIcon from "@/assets/svg/icon/icon_ins.svg?react";
// import DyIcon from "@/assets/svg/icon/icon_dy.svg?react";
import { Link } from "react-router-dom";
import SocialData from "./SocialData";
import Qr from "./Qr";
import Share from "./Share";
export default function () {
  const { User } = useStore();
  return (
    <div className="bg-gray-800 rounded-3xl shadow w-full p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-white text-sm">
          Valid ID: {User.id}
        </span>
      </div>
      <div className="flex mt-4 items-center  justify-between">
        <div className="flex gap-3 items-center">
          <div className="avatar">
            <div className="border rounded-full border-neutral-400 w-14">
              {User.profile?.avatar && <img src={User.profile?.avatar} />}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white text-base">
              {User.profile?.name}
            </span>
            <div className="flex gap-2">
              <a className="border-none bg-gray-600 btn btn-circle btn-xs">
                {/* <MediumIcon /> */}
              </a>
              <a className="border-none bg-gray-600 btn btn-circle btn-xs">
                {/* <XIcon /> */}
              </a>
              <a className="border-none bg-gray-600 btn btn-circle btn-xs">
                {/* <InsIcon /> */}
              </a>
              <a className="border-none bg-gray-600 btn btn-circle btn-xs">
                {/* <DyIcon /> */}
              </a>
            </div>
          </div>
        </div>
        <Link
          to={{ pathname: "profile/edit" }}
          className="bg-transparent border rounded-lg font-bold border-neutral-400 text-xs text-neutral-400 btn btn-sm"
        >
          Edit
        </Link>
      </div>
      <div className="mt-8 mb-4">
        <SocialData />
      </div>
      <div className="flex flex-row mb w-full gap-4 items-center">
        <Qr />
        <Share />
      </div>
    </div>
  );
}
