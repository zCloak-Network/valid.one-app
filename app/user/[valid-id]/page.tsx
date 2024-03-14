"use client";

import Drawer from "@/components/Drawer";
import { default as useStore, observer } from "@/store";
import { useState } from "react";

export default observer(function HomePage({
  params,
}: {
  params: { "valid-id": string };
}) {
  const { User } = useStore();
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <div>
      <div>User: {params["valid-id"]}</div>

      <div className="flex h-56 flex-col overflow-hidden rounded-2xl border border-blue-950 bg-white pb-4">
        <div className="flex h-11 items-center justify-between bg-gray-800 px-4">
          <span className="text-sm text-white">Valid ID</span>
          <span className="text-xs text-white text-opacity-80">{User.id}</span>
        </div>
        <div className="flex h-full flex-col justify-between px-4 pt-4 text-sm text-gray-900">
          <p>
            Set up your profile to give everyone a peek into who you truly are.
            Keep in mind, everything you put here is for the world to see.
          </p>
          <div className="border- h-px border border-gray-100" />

          <button className="w-full rounded-xl bg-gray-800 p-2 text-white">
            Setup Profile
          </button>
        </div>
      </div>

      <div>
        <button
          className="rounded bg-blue-500 p-2 text-white"
          onClick={() => setDrawerOpen(true)}
        >
          Open Drawer
        </button>

        <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="flex h-80 w-full flex-col justify-between rounded-tl-3xl rounded-tr-3xl bg-white p-6">
            <div className="mx-auto h-1 w-14 rounded-full bg-gray-200" />

            <h3>Welcome to Valid ID</h3>
            <p className="font-['Manrope'] text-sm font-normal leading-tight text-gray-400">
              Done signing up! You've been given a unique ID number. It'll be on
              your profile, so no need to memorize it
            </p>
            <div className="mx-auto my-3 flex h-12 w-48 items-center justify-center rounded-xl  border border-zinc-200 bg-neutral-100">
              123445
            </div>
            <button
              className="w-full rounded-xl bg-gray-800 p-2 text-white"
              onClick={() => setDrawerOpen(false)}
            >
              Got it
            </button>
          </div>
        </Drawer>
      </div>
    </div>
  );
});
