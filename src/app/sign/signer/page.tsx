"use client";
import { useState } from "react";
import { default as useStore, observer } from "@/store";
import type { SignType } from "@/types";
import { signTypes } from "@/constants";
import SignatureResult from "./SignatureResult";
import { actor } from "@/utils/canister";
import { useNavigate } from "react-router-dom";

export default observer(function Signer() {
  const navigate = useNavigate();
  const { User } = useStore();
  const [type, setType] = useState<SignType>("message");
  const [messageCont, setMessageCont] = useState("");
  // const [fileCont, setFileCont] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSign = async () => {
    if (!User.id) {
      return navigate("/login");
    }
    setLoading(true);

    const res = await actor.sign(User.id, messageCont);

    if ((res as any)["Ok"]?.signature_hex) {
      setResult((res as any)["Ok"].signature_hex);
      setOpenStatus(true);
    } else {
      console.warn("sign fail", res);
    }

    setLoading(false);
  };

  return (
    <div className="rounded-xl bg-[#F9FAFB] p-4">
      <div className="mb-4 flex h-[52px] items-center gap-2 rounded-xl border border-zinc-200 p-4">
        <div className="relative h-6 w-6">
          <div className="absolute left-[1px] top-[1px] h-[22px] w-[22px] rounded-full bg-zinc-300" />
        </div>
        <div className="text-sm font-medium text-gray-900">{User.id}</div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <div className=" self-stretch text-sm  text-zinc-500">
          What do you want to sign?
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

      <div className="mb-4">
        {type === "message" && (
          <textarea
            className="textarea-border textarea w-full"
            placeholder="Please enter your message here"
            value={messageCont}
            onChange={(e) => setMessageCont(e.target.value)}
          ></textarea>
        )}
        {type === "file" && (
          <div className="form-control min-h-40">
            <label className="label cursor-pointer gap-2"></label>
            <input type="file" className="file-input w-full max-w-xs" />
          </div>
        )}
      </div>

      {type === "message" && (
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
      )}

      <div className="my-4 border"></div>

      <button
        className="btn btn-neutral btn-block"
        disabled={loading}
        onClick={() => handleSign()}
      >
        {loading && <span className="loading loading-spinner"></span>}
        Sign
      </button>

      {/* SignatureResult */}
      <SignatureResult
        open={openStatus}
        signatureHex={result}
        onClose={() => setOpenStatus(false)}
      />
    </div>
  );
});
