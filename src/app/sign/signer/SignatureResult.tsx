"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import IconSign from "@/assets/svg/icon_sign.svg?react";
import IconCloak from "@/assets/svg/clock.svg?react";

export default function SignatureResult(props: {
  open: boolean;
  onClose: () => void;
}) {
  const [openResult, setOpenResult] = useState(false);
  useEffect(() => {
    setOpenResult(props.open);
  }, [props]);

  const [signature, setSignature] = useState<string>("Message");

  return (
    <ActionModal
      title="Signature Result"
      open={openResult}
      closeByModal
      onClose={props.onClose}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <IconSign className="h-[55px] w-[55px] relative" />

          <div className="flex flex-col flex-1 gap-2 items-start">
            <span className="font-medium text-sm text-black  leading-normal tracking-tight">
              The message has been signed at
            </span>
            <div className="flex font-semibold text-xs leading-none text-neutral-400 gap-1 items-center">
              <IconCloak className="h-4 w-4" />
              2024-12-12: 00:12:12
            </div>
          </div>
        </div>
        <label className="form-control">
          <TextareaWithCopy value={signature} />
        </label>
        <div className="border-t"></div>

        <div className="flex px-20 gap-5 justify-between">
          <div className="flex flex-col flex-1">
            <div className="flex m-auto bg-gray-800 rounded-[1000px] h-[57px] px-4 w-[57px] items-center justify-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c830d601174db9e130799b095f4f0d7d4f0cae14e7dcb9b377e925a4735e9f94?apiKey=bdc70480199b4c7f9edcac5b83339cc0&"
                className="w-6 aspect-square"
              />
            </div>
            <div className="font-semibold mt-3 text-center text-xs text-slate-900 leading-4 whitespace-nowrap">
              Share link
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex m-auto bg-blue-700 rounded-[1000px] h-14 px-4 w-14 items-center justify-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88297bcb3b2a363e6583446b75f604789f5d3602708c34b14f96931c78caf48?apiKey=bdc70480199b4c7f9edcac5b83339cc0&"
                className="w-6 aspect-square"
              />
            </div>
            <div className="font-semibold mt-3 text-center text-xs text-slate-900 leading-4 whitespace-nowrap">
              QR Code
            </div>
          </div>
        </div>
      </div>
    </ActionModal>
  );
}
