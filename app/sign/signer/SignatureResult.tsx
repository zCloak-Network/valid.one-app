"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import IconSign from "@/public/svg/icon_sign.svg";
import IconCloak from "@/public/svg/clock.svg";

export default function SignatureResult(props: {
  open: boolean;
  onClose: () => void;
}) {
  const [openResult, setOpenResult] = useState(false);
  useEffect(() => {
    setOpenResult(props.open);
  }, [props]);

  return (
    <ActionModal
      title="Signature Result"
      open={openResult}
      closeByModal
      onClose={props.onClose}
    >
      <div className="flex flex-col gap-4">
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
        <label className="form-control">
          <TextareaWithCopy value={"message"} />
        </label>
        <div className="border-t"></div>
        share link
      </div>
    </ActionModal>
  );
}
