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
      <div className="border rounded-xl flex border-zinc-200 h-[52px] mb-4 p-4 gap-2 items-center">
        <div className="h-6 w-6 relative">
          <div className="rounded-full bg-zinc-300 h-[22px] top-[1px] left-[1px] w-[22px] absolute" />
        </div>
        <div className="font-medium text-sm text-gray-900">1124731</div>
      </div>

      <div className="flex flex-col mb-4 gap-4">
        <div className=" text-sm text-zinc-500  self-stretch">
          What do you want to sign?
        </div>
        <div className="flex w-full items-center">
          {signTypes.map((signType) => (
            <label className="cursor-pointer flex-1 gap-2 label justify-normal">
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
            className="w-full textarea-border textarea"
            placeholder="Please enter your message here"
          ></textarea>
        )}
        {type === "file" && (
          <div className="min-h-40 form-control">
            <label className="cursor-pointer gap-2 label"></label>
            <input type="file" className="max-w-xs w-full file-input" />
          </div>
        )}
      </div>

      {type === "message" && (
        <div className="form-control">
          <label className="cursor-pointer gap-2 label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox-primary checkbox"
            />
            <span className="text-xs label-text">
              Select this and we'll create a shareable link for your signed
              message. Note: we'll store your message.
            </span>
          </label>
        </div>
      )}

      <div className="border my-4"></div>

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
