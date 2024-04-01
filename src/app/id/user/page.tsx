import { useLoaderData, LoaderFunctionArgs, Link } from "react-router-dom";
import IconBack from "@/assets/svg/icon/icon_back.svg?react";
import { observer } from "@/store";
import MediumIcon from "@/assets/svg/icon/icon_medium.svg?react";
import XIcon from "@/assets/svg/icon/icon_x.svg?react";
import InsIcon from "@/assets/svg/icon/icon_ins.svg?react";
import DyIcon from "@/assets/svg/icon/icon_dy.svg?react";
import { UserData } from "@/store/modules/user";
import initActor, { actor } from "@/utils/canister";

interface ItemProps {
  label: string;
  value: string;
}

function Item({ label, value }: ItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-center text-slate-900 text-lg font-bold">
        {value}
      </span>
      <span className="text-center text-slate-500 text-sm">{label}</span>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { validId } = params;

  await initActor();
  const result = validId
    ? await actor.user_profile_get(parseInt(validId))
    : null;

  const profile: UserData | undefined = result?.[0]
    ? {
        ...result?.[0],
        create_time: Number(result[0].create_time),
        modify_time: Number(result[0].modify_time),
      }
    : undefined;

  return { validId, profile };
}

export default observer(function User() {
  const { profile } = useLoaderData() as {
    validId: string;
    profile: UserData | undefined;
  };

  return (
    <div className="p-6 w-full h-full bg-gray-50">
      <div>
        <Link
          className="absolute rounded-lg border border-zinc-300 p-2"
          to={"/id"}
          replace
        >
          <IconBack />
        </Link>
      </div>
      <div className="pt-20 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="avatar">
            <div className="w-[72px] rounded-full border border-neutral-400">
              <img src={profile?.avatar} />
            </div>
          </div>
          {/* <button className="btn rounded-xl bg-gray-800 text-white">+Follow</button> */}
        </div>

        <div className=" text-slate-900 text-lg font-extrabold leading-relaxed tracking-tight">
          {profile?.name}
        </div>
        <div className=" text-slate-900 text-xs font-normal leading-none tracking-tight">
          {profile?.bio}
        </div>
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
        <div className="h-px border border-gray-100"></div>
        <div className="flex gap-4 items-center justify-between">
          <Item value="0" label="Followers" />
          <div className="w-7 h-px origin-center rotate-90 border border-slate-200"></div>
          <Item value="0" label="Following" />
          <div className="w-7 h-px origin-center rotate-90 border border-slate-200"></div>
          <Item value="0" label="Connected" />
        </div>
        {/* <div className="w-full h-16 bg-white rounded-xl shadow mt-5 flex items-center px-3">
          <div className="w-8 h-7 bg-blue-700 bg-opacity-20 rounded-full" />
          <div className="w-11 h-7 relative -left-4">
            <div className="w-8 h-7 left-0 top-0 absolute bg-blue-700 rounded-full" />
            <div className="w-8 h-7 left-[15.28px] top-0 absolute bg-gray-700 rounded-full" />
          </div>
          <div className="text-gray-800 text-xs font-medium">
            14 of your followings also follow this user
          </div>
        </div> */}
      </div>
    </div>
  );
});
