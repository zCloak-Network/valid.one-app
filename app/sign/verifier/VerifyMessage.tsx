"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import IconSign from "@/public/svg/icon_sign.svg";
import IconCloak from "@/public/svg/clock.svg";
import UserCard from "./UserCard";

export default function VerifyMessage(props: {
  open: boolean;
  onClose: () => void;
}) {
  const [openResult, setOpenResult] = useState(false);
  useEffect(() => {
    setOpenResult(props.open);
  }, [props]);

  return (
    <ActionModal
      title="Result"
      open={openResult}
      closeByModal
      onClose={props.onClose}
    >
      <div className="flex flex-col gap-4">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Message</span>
          </div>
          <TextareaWithCopy value={"message"} />
        </label>
        <div className="flex items-center gap-3">
          <IconSign className="relative h-[55px] w-[55px]" />

          <div className="flex flex-1 flex-col items-start gap-2">
            <span className="text-sm font-medium leading-normal  tracking-tight text-black">
              The message has been signed at
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold leading-none text-neutral-400">
              <IconCloak className="h-4 w-4" />
              2024-12-12: 00:12:12
            </div>
          </div>
        </div>

        <div className="border-t"></div>

        <UserCard validId={"11111"} />

        <div className="h-[21.67px] w-[335px]">
          <span className="font-['Manrope'] text-xs font-semibold leading-tight text-slate-400">
            Check the on-chain record here:
          </span>

          <span className="font-['Manrope'] text-xs font-semibold leading-tight text-blue-600 underline">
            https://www.
          </span>
        </div>
      </div>
    </ActionModal>
  );
}
