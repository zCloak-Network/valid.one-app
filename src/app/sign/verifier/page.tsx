"use client";
import { useState, useEffect, useRef } from "react";
import { default as useStore, observer } from "@/store";
import type { SignType } from "@/types";
import { signTypes } from "@/constants";
import VerifyMessage from "./VerifyMessage";
import { ethereumEncode } from "@zcloak/crypto";
import { IoIosCloseCircle } from "react-icons/io";
import { sha256OfFile } from "@/utils";

export default observer(function Verifier() {
  const [type, setType] = useState<SignType>("message");
  const [signatureResult, setSignatureResult] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [fileCont, setFileCont] = useState("");
  const [selectFile, setSelectFile] = useState<File | undefined>();
  const [ValidID, setValidID] = useState("");

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

  const validContIsReady = () => {
    if (type === "message") {
      return signatureResult.length > 0;
    } else {
      return fileCont.length > 0;
    }
  };

  // TODO
  const { User } = useStore();
  useEffect(() => {
    console.log(User.profile);
    if (User.profile?.public_key) {
      console.log(`0x${User.profile?.public_key}`);
      console.log(ethereumEncode(`0x${User.profile?.public_key}`));
    }
  }, [User]);

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
              className="textarea textarea-bordered h-60 leading-normal"
              placeholder={`Please paste the signature here
e.g
Message
===
Valid Sign from Valid One
===
signer:signer address,
sig:signature value`}
              value={signatureResult}
              onChange={(e) => setSignatureResult(e.target.value)}
            ></textarea>
          </label>
        )}

        {type === "file" && (
          <>
            <label className="form-control">
              <div className="label">
                <span className="label-text">File</span>
              </div>
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
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Signer (Optional)</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Please enter the valid ID of the signer"
                  className="input input-bordered flex-1"
                  value={ValidID}
                  onChange={(e) =>
                    setValidID(
                      isNaN(Number(e.target.value)) ? "" : e.target.value
                    )
                  }
                />
                {ValidID && (
                  <IoIosCloseCircle
                    className="w-8 h-8 text-gray-400"
                    onClick={() => {
                      setValidID("");
                    }}
                  />
                )}
              </div>
            </label>
          </>
        )}
      </div>

      <div className="my-4 border"></div>

      <button
        className="btn btn-neutral btn-block"
        disabled={!validContIsReady()}
        onClick={() => setOpenModal(true)}
      >
        Verify
      </button>

      {/* VerifyMessage */}
      <VerifyMessage
        signatureResult={signatureResult}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
});
