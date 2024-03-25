"use client";
import { useState, useMemo, useRef } from "react";
import { default as useStore, observer } from "@/store";
import type { SignType } from "@/types";
import { signTypes, signatureResultTemplate } from "@/constants";
import SignatureResult from "./SignatureResult";
import { actor } from "@/utils/canister";
import { useNavigate } from "react-router-dom";
import { sha256AsU8a } from "@zcloak/crypto";
import { u8aToHex } from "@polkadot/util";
import { IoIosCloseCircle } from "react-icons/io";

export default observer(function Signer() {
  const navigate = useNavigate();
  const { User } = useStore();
  const [type, setType] = useState<SignType>("message");
  const [messageCont, setMessageCont] = useState("");
  const [fileCont, setFileCont] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ICPSignResult, setICPSignResult] = useState("");
  const [needShortlink, setNeedShortlink] = useState(true);

  const signCont = useMemo(
    () => (type === "message" ? messageCont : fileCont),
    [type, messageCont, fileCont]
  );

  const signatureResult = useMemo(() => {
    if (signCont && ICPSignResult) {
      return signatureResultTemplate(
        User.profile?.public_key || "test_key",
        signCont,
        ICPSignResult
      );
    }
    return undefined;
  }, [ICPSignResult, signCont]);

  const handleSign = async () => {
    if (!User.id) {
      return navigate("/login");
    }
    setLoading(true);

    const res = await actor.sign(User.id, signCont);
    console.log(type, signCont, "sign result", res);
    if ((res as any)["Ok"]?.signature_hex) {
      setICPSignResult((res as any)["Ok"].signature_hex);
      setOpenStatus(true);
    } else {
      console.warn("sign fail", res);
    }

    setLoading(false);
  };

  const fileSelector = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    if (fileSelector.current) {
      const file = fileSelector.current.files?.[0];

      if (file) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
          var wordArray = new Uint8Array(reader.result as ArrayBuffer);
          var hash = sha256AsU8a(wordArray);
          console.log("get file sha256", u8aToHex(hash));
          setFileCont(u8aToHex(hash));
        };
      } else {
        setFileCont("");
      }
    }
  };

  const contIsReady = () => {
    if (type === "message") {
      return messageCont.length > 0;
    } else {
      return fileCont.length > 0;
    }
  };

  return (
    <div className="rounded-xl bg-[#F9FAFB] p-4">
      <div className="mb-4 flex h-[52px] items-center gap-2 rounded-xl border border-zinc-200 p-4">
        <div className="relative h-6 w-6">
          <img
            src={User.profile?.avatar}
            className="absolute left-[1px] top-[1px] h-[22px] w-[22px] rounded-full bg-zinc-300"
          />
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
            <div className="flex items-center gap-2">
              <input
                ref={fileSelector}
                type="file"
                className="file-input flex-1"
                onChange={handleFileChange}
              />
              {fileCont && (
                <IoIosCloseCircle
                  className="w-8 h-8 text-gray-400"
                  onClick={() => {
                    fileSelector.current && (fileSelector.current.value = "");
                    handleFileChange();
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {type === "message" && (
        <div className="form-control">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={needShortlink}
              onChange={() => setNeedShortlink(!needShortlink)}
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
        disabled={loading || !contIsReady()}
        onClick={() => handleSign()}
      >
        {loading && <span className="loading loading-spinner"></span>}
        Sign
      </button>

      {/* SignatureResult */}
      <SignatureResult
        open={openStatus}
        needShortlink={needShortlink}
        signatureResult={signatureResult}
        onClose={() => {
          setOpenStatus(false);
          setICPSignResult("");
        }}
      />
    </div>
  );
});
