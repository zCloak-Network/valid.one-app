"use client";
import { useState, useMemo, useRef } from "react";
import { default as useStore, observer } from "@/store";
import type { SignType } from "@/types";
import { signTypes, signatureResultTemplate } from "@/constants";
import SignatureResult from "./SignatureResult";
import { actor } from "@/utils/canister";
import { useNavigate } from "react-router-dom";
import { sha256OfFile } from "@/utils";
import { IoIosCloseCircle } from "react-icons/io";

export default observer(function Signer() {
  const navigate = useNavigate();
  const { User } = useStore();
  const [type, setType] = useState<SignType>("message");
  const [messageCont, setMessageCont] = useState("");
  const [fileCont, setFileCont] = useState("");
  const [selectFile, setSelectFile] = useState<File | undefined>();
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

    const res = await actor.sign_bytes65(User.id, signCont);
    console.log(User.id, signCont, type, signCont, "sign result", res);
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
      setSelectFile(file);
      if (file) {
        sha256OfFile(file).then((res) => {
          console.log("get file sha256", res);
          setFileCont(res);
        });
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
      <div className="border rounded-xl flex border-zinc-200 h-[52px] mb-4 p-4 gap-2 items-center">
        <div className="h-6 w-6 relative">
          <img
            src={User.profile?.avatar}
            className="rounded-full bg-zinc-300 h-[22px] top-[1px] left-[1px] w-[22px] absolute"
          />
        </div>
        <div className="font-medium text-sm text-gray-900">{User.id}</div>
      </div>

      <div className="flex flex-col mb-4 gap-4">
        <div className=" text-sm text-zinc-500  self-stretch">
          What do you want to sign?
        </div>
        <div className="flex w-full items-center">
          {signTypes.map((signType) => (
            <label
              className="cursor-pointer flex-1 gap-2 label justify-normal"
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
            className="w-full textarea-border textarea"
            placeholder="Please enter your message here"
            value={messageCont}
            onChange={(e) => setMessageCont(e.target.value)}
          ></textarea>
        )}
        {type === "file" && (
          <div className="min-h-40 form-control">
            <label className="cursor-pointer gap-2 label"></label>
            <div className="flex gap-2 items-center">
              <input
                ref={fileSelector}
                type="file"
                className="flex-1 file-input"
                onChange={handleFileChange}
              />
              {fileCont && (
                <IoIosCloseCircle
                  className="h-8 text-gray-400 w-8"
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
          <label className="cursor-pointer gap-2 label">
            <input
              type="checkbox"
              checked={needShortlink}
              onChange={() => setNeedShortlink(!needShortlink)}
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
        selectFile={selectFile}
        onClose={() => {
          setOpenStatus(false);
          setICPSignResult("");
        }}
      />
    </div>
  );
});
