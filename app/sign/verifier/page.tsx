"use client";
import { useState } from "react";
// import { default as useStore, observer } from "@/store";
import type { SignType } from "@/types";
import VerifyMessage from "./VerifyMessage";

export default function Verifier() {
  const [type, setType] = useState<SignType>("message");

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

  const [openResult, setOpenResult] = useState(false);

  return (
    <div className="rounded-xl bg-[#F9FAFB] p-4">
      <div className="mb-4 flex flex-col gap-4">
        <div className=" self-stretch text-sm  text-zinc-500">
          What do you want to verify?
        </div>
        <div className="flex w-full items-center">
          {signTypes.map((signType) => (
            <label
              className="label flex-1 cursor-pointer justify-normal gap-2"
              key={signType.type}
            >
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

      <div className="mb-4 flex flex-col gap-4">
        {type === "message" && (
          <label className="form-control">
            <div className="label">
              <span className="label-text">Signature</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-52 leading-normal"
              placeholder={`Please paste the signature here
e.g
Valid Sign from id.valid.one
===
Message
===
signer: signer address/valid id,
signature:signature value`}
            ></textarea>
          </label>
        )}

        {type === "file" && (
          <>
            <label className="form-control">
              <div className="label">
                <span className="label-text">File</span>
              </div>
              <input type="file" className="file-input w-full max-w-xs" />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Signer (Optional)</span>
              </div>
              <input
                type="text"
                placeholder="Please enter the valid ID of the signer"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </>
        )}
      </div>

      <div className="my-4 border"></div>

      <button
        className="btn btn-neutral btn-block"
        onClick={() => setOpenResult(true)}
      >
        Verify
      </button>

      {/* VerifyMessage */}
      <VerifyMessage open={openResult} onClose={() => setOpenResult(false)} />
    </div>
  );
}
