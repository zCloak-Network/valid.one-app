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
      <span className="font-bold text-center text-lg text-slate-900">
        {value}
      </span>
      <span className="text-center text-sm text-slate-500">{label}</span>
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
    <div className="h-full bg-gray-50 w-full p-6">
      <div>
        <Link
          className="border rounded-lg border-zinc-300 p-2 absolute"
          to={"/id"}
          replace
        >
          <IconBack />
        </Link>
      </div>
      <div className="flex flex-col pt-20 gap-4">
        <div className="flex items-center justify-between">
          <div className="avatar">
            <div className="border rounded-full border-neutral-400 w-[72px]">
              {profile?.avatar && <img src={profile?.avatar} />}
            </div>
          </div>
          {/* <button className="rounded-xl bg-gray-800 text-white btn">+Follow</button> */}
        </div>

        <div className=" font-extrabold text-lg leading-relaxed tracking-tight text-slate-900">
          {profile?.name}
        </div>
        <div className=" font-normal text-xs leading-none tracking-tight text-slate-900">
          {profile?.bio}
        </div>
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
        <div className="border h-px border-gray-100"></div>
        <div className="flex gap-4 items-center justify-between">
          <Item value="0" label="Followers" />
          <div className="border h-px border-slate-200 origin-center w-7 rotate-90"></div>
          <Item value="0" label="Following" />
          <div className="border h-px border-slate-200 origin-center w-7 rotate-90"></div>
          <Item value="0" label="Connected" />
        </div>
        {/* <div className="bg-white rounded-xl flex h-16 shadow mt-5 w-full px-3 items-center">
          <div className="rounded-full bg-blue-700 bg-opacity-20 h-7 w-8" />
          <div className="h-7 -left-4 w-11 relative">
            <div className="rounded-full bg-blue-700 h-7 top-0 left-0 w-8 absolute" />
            <div className="rounded-full bg-gray-700 h-7 top-0 left-[15.28px] w-8 absolute" />
          </div>
          <div className="font-medium text-xs text-gray-800">
            14 of your followings also follow this user
          </div>
        </div> */}
      </div>
    </div>
  );
});
