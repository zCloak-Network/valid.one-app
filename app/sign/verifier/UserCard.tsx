"use client";
import { useState } from "react";

export default function UserCard(props: { validId: string }) {
  const [openResult, setOpenResult] = useState(false);

  return (
    <div className="flex h-32 flex-col items-start justify-center gap-4 rounded-xl bg-gray-800 p-4">
      <div className="flex items-center">
        <div className="flex-1 text-sm font-medium leading-tight tracking-tight text-white">
          Valid ID
        </div>
        <div className=" text-sm font-medium text-zinc-300">121213</div>
      </div>
      <div className="relative h-[60px] w-[174.87px]">
        <div className="absolute left-0 top-0 h-[60px] w-[60px]">
          <div className="absolute left-0 top-0 h-[60px] w-[60px] rounded-full border border-neutral-400" />
          <div className="absolute left-[3px] top-[3px] h-[54px] w-[54px] rounded-[27px] bg-zinc-300" />
          <img
            className="absolute left-[-33.65px] top-[-30px] h-[146.39px] w-[129.65px]"
            src="https://via.placeholder.com/130x146"
          />
        </div>
        <div className="absolute left-[70.87px] top-[33px] flex h-5 w-[104px] items-start justify-start gap-2">
          <div className="relative h-5 w-5">
            <div className="absolute left-0 top-0 h-5 w-5 rounded-[15px] bg-gray-600" />
            <div className="absolute left-[4.58px] top-[4.58px] h-[10.83px] w-[11.25px]" />
          </div>
          <div className="relative h-5 w-5">
            <div className="absolute left-[4.58px] top-[4.58px] h-[10.83px] w-[11.25px]" />
          </div>
          <div className="relative h-5 w-5">
            <div className="absolute left-0 top-0 h-5 w-5 rounded-[15px] bg-gray-600" />
            <div className="absolute left-[4.58px] top-[4.58px] h-[10.83px] w-[11.25px]" />
          </div>
          <div className="relative h-5 w-5">
            <div className="absolute left-0 top-0 h-5 w-5 rounded-[15px] bg-gray-600" />
            <div className="absolute left-[4.58px] top-[4.58px] h-[10.83px] w-[11.25px]" />
          </div>
        </div>
        <div className="absolute left-[70px] top-[1px] w-[104.65px] font-['Manrope'] text-[15px] font-bold text-white">
          John Doe
        </div>
      </div>
    </div>
  );
}
