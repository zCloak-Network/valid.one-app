"use client";
import { useState, useEffect, useMemo } from "react";
import { getProfileById, getProfileByPublicKey } from "@/hooks";
import type { UserProfile } from "@/utils/canister/valid_one_backend/valid_one_backend.did";
import XIcon from "@/assets/svg/icon/icon_x.svg?react";
import DefaultAvatar from "@/assets/images/avatar.jpg";

export default function UserCard(props: {
  validId?: number;
  publicKey?: string;
  signerProfile?: UserProfile;
}) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const hasBindTwitter = useMemo(() => {
    return profile?.twitter_handle[0];
  }, [profile]);

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
    <div className="rounded-xl flex flex-col bg-gray-800 p-4 gap-4">
      <div className="flex w-full items-center">
        <div className="font-medium flex-1 text-sm text-white leading-tight tracking-tight">
          Valid ID: {props.validId}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="border rounded-full border-neutral-400 h-[60px] p-[2px] w-[60px]">
          <img
            className="rounded-full h-full object-cover w-full"
            src={profile?.avatar || DefaultAvatar}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="font-bold text-white w-full text-[15px]">
            {loading ? "loading" : profile?.name || "Unkonwn"}
          </div>

          <div className="flex w-full gap-2">
            {hasBindTwitter ? (
              <a
                className="border-none bg-gray-600 btn btn-circle btn-xs"
                onClick={() =>
                  window.open(`https://twitter.com/${hasBindTwitter}`)
                }
              >
                <XIcon />
              </a>
            ) : (
              <div className="bg-gray-600 rounded-[15px] h-5 w-5 relative"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
