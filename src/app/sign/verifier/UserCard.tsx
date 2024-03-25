"use client";
import { useState, useEffect } from "react";
import { getProfileById, getProfileByPublicKey } from "@/hooks";
import { UserProfile } from "@/types";

export default function UserCard(props: {
  validId?: number;
  publicKey?: string;
  signerProfile?: UserProfile;
}) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (props.signerProfile) {
      setProfile(props.signerProfile);
    } else if (props.validId) {
      setLoading(true);
      getProfileById(props.validId).then((res) => {
        res && setProfile(res);
        setLoading(false);
      });
    } else if (props.publicKey) {
      console.log("publicKey", props.publicKey);
      setLoading(true);
      getProfileByPublicKey(props.publicKey).then((res) => {
        res && setProfile(res as any);
        setLoading(false);
      });
    }
  }, [props]);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-800 p-4">
      <div className="flex w-full items-center">
        <div className="flex-1 text-sm font-medium leading-tight tracking-tight text-white">
          Valid ID
        </div>
        <div className=" text-sm font-medium text-zinc-300">
          {props.validId}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[60px] w-[60px] rounded-full border border-neutral-400 p-[2px]">
          <img
            className="h-full w-full rounded-full object-cover"
            src="https://via.placeholder.com/130x146"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="w-full text-[15px] font-bold text-white">
            {loading ? "loading" : profile?.name || "Unkonwn"}
          </div>

          <div className="flex w-full gap-2">
            <div className="relative h-5 w-5 rounded-[15px] bg-gray-600"></div>
            <div className="relative h-5 w-5 rounded-[15px] bg-gray-600"></div>
            <div className="relative h-5 w-5 rounded-[15px] bg-gray-600"></div>
            <div className="relative h-5 w-5 rounded-[15px] bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
