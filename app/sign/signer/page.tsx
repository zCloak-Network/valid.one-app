"use client";
import { useState } from "react";
import type { SignType } from "@/types";
import SignatureResult from "./SignatureResult";

export default function Signer() {
  const [type, setType] = useState<SignType>("message");
  const [openResult, setOpenResult] = useState(false);

  const signTypes: Array<{ label: string; type: SignType }> = [
    {
      label: "Message",
      type: "message",
    },
    {
      label: "File",
      type: "file",
    },
  ];

  return (
    <div className="rounded-xl bg-[#F9FAFB] p-4">
      <div className="mb-4 flex h-[52px] items-center gap-2 rounded-xl border border-zinc-200 p-4">
        <div className="relative h-6 w-6">
          <div className="absolute left-[1px] top-[1px] h-[22px] w-[22px] rounded-full bg-zinc-300" />
        </div>
        <div className="text-sm font-medium text-gray-900">1124731</div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <div className=" self-stretch text-sm  text-zinc-500">
          What do you want to sign?
        </div>
        <div className="flex w-full items-center">
          {signTypes.map((signType) => (
            <label className="label flex-1 cursor-pointer justify-normal gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio-primary radio"
                checked={type === signType.type}
                onChange={() => setType(signType.type)}
              />
              <span className="label-text">{signType.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        {type === "message" && (
          <textarea
            className="textarea-border textarea w-full"
            placeholder="Please enter your message here"
          ></textarea>
        )}
        {type === "file" && (
          <input type="file" className="file-input w-full max-w-xs" />
        )}
      </div>

      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox-primary checkbox"
          />
          <span className="label-text text-xs">
            Select this and we'll create a shareable link for your signed
            message. Note: we'll store your message.
          </span>
        </label>
      </div>

      <div className="my-4 border"></div>

      <button
        className="btn btn-neutral btn-block"
        onClick={() => setOpenResult(true)}
      >
        Sign
      </button>

      {/* SignatureResult */}
      <SignatureResult open={openResult} onClose={() => setOpenResult(false)} />
    </div>
  );
}
