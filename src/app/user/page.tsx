"use client";
import { useLoaderData } from "react-router-dom";
import Drawer from "@/components/Drawer";
import { default as useStore, observer } from "@/store";
import { useState } from "react";

export async function loader(params: { validId: string }) {
  const { validId } = params;
  return { validId };
}

export default observer(function User() {
  const { User } = useStore();
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const { validId } = useLoaderData() as { validId: string };

  return (
    <div>
      <div>User: {validId}</div>

      <div className="bg-white border flex flex-col border-blue-950 rounded-2xl h-56 pb-4 overflow-hidden">
        <div className="flex bg-gray-800 h-11 px-4 items-center justify-between">
          <span className="text-sm text-white">Valid ID</span>
          <span className="text-xs text-white text-opacity-80">{User.id}</span>
        </div>
        <div className="flex flex-col h-full text-sm px-4 pt-4 text-gray-900 justify-between">
          <p>
            Set up your profile to give everyone a peek into who you truly are.
            Keep in mind, everything you put here is for the world to see.
          </p>
          <div className="border- border h-px border-gray-100" />

          <button className="rounded-xl bg-gray-800 text-white w-full p-2">
            Setup Profile
          </button>
        </div>
      </div>

      <div>
        <button
          className="rounded bg-blue-500 text-white p-2"
          onClick={() => setDrawerOpen(true)}
        >
          Open Drawer
        </button>

        <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="bg-white flex flex-col rounded-tl-3xl rounded-tr-3xl h-80 w-full p-6 justify-between">
            <div className="rounded-full mx-auto bg-gray-200 h-1 w-14" />

            <h3>Welcome to Valid ID</h3>
            <p className="'Manrope'] text-sm font-normal leading-tight text-gray-400">
              Done signing up! You've been given a unique ID number. It'll be on
              your profile, so no need to memorize it
            </p>
            <div className="border rounded-xl flex mx-auto bg-neutral-100 border-zinc-200 h-12 my-3  w-48 items-center justify-center">
              123445
            </div>
            <button
              className="rounded-xl bg-gray-800 text-white w-full p-2"
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
