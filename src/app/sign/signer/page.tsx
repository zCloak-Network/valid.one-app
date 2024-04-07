"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { default as useStore, observer, autorun } from "@/store";
import { signTypes, signatureResultTemplate } from "@/constants";
import SignatureResult from "./SignatureResult";
import { actor } from "@/utils/canister";
import { useNavigate } from "react-router-dom";
import { sha256OfFile, sha256OfString } from "@/utils";
import { IoIosCloseCircle } from "react-icons/io";
import { usePasskeyAuth } from "@/hooks";
import type { SignatureResponse } from "@/types";
import { saveString } from "@/api";
import { useToast } from "@/components";

export default observer(function Signer() {
  const toast = useToast();
  const { auth } = usePasskeyAuth();
  const navigate = useNavigate();
  const { User } = useStore();
  const [signType, setType] = useState<number>(1);
  const [messageCont, setMessageCont] = useState("");
  const [fileSHA256, setFileSHA256] = useState("");
  const [selectFile, setSelectFile] = useState<File | undefined>();
  const [openStatus, setOpenStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ICPSignResult, setICPSignResult] = useState("");
  const [ICPSignResponse, setICPSignResponse] =
    useState<SignatureResponse | null>(null);
  const [publicMode, setPublicMode] = useState(false);
  const messageContTrim = useMemo(() => {
    return messageCont.trim();
  }, [messageCont]);

  const messageSHA256 = useMemo(() => {
    return sha256OfString(messageContTrim);
  }, [messageContTrim]);

  const signCont = useMemo(
    () => (signType === 1 ? messageSHA256 : fileSHA256),
    [signType, messageSHA256, fileSHA256]
  );

  const clearAutorun = autorun(() => {
    if (!User.name) {
      navigate("/login");
      return undefined;
    }
  });

  useEffect(() => {
    return clearAutorun;
  });

  const signatureResult = useMemo(() => {
    if (User.profile && signCont && ICPSignResult) {
      return signatureResultTemplate(
        User.profile.public_key,
        signCont,
        ICPSignResult,
        messageContTrim
      );
    }
    return undefined;
  }, [ICPSignResult, signCont]);

  const handleSign = async () => {
    if (!User.profile?.public_key) {
      toast &&
        toast({
          type: "error",
          message: "Please complete your profile first",
        });
      return navigate("/id/profile/edit");
    }
    setLoading(true);

    let publicContentKey = "";
    if (signType === 1) {
      if (publicMode && messageContTrim) {
        // TODO send cont to api
        const saveStringRes = await saveString({ content: messageContTrim });
        if (saveStringRes.data) {
          publicContentKey = saveStringRes.data;
          console.log("save string get key:", publicContentKey);
        } else {
          setLoading(false);
          toast &&
            toast({
              type: "error",
              message: saveStringRes.msg || "save cont fail",
            });
          return null;
        }
      }
    }
    const [authRequest] = await auth();

    const res = await actor.sign_insert(
      authRequest,
      signType,
      signCont,
      publicContentKey
    );
    console.log(User.id, signType, signCont, "sign result", res);

    if ((res as any)["Ok"]?.signature) {
      setICPSignResult((res as any)["Ok"].signature);
      setICPSignResponse({
        ...(res as any)["Ok"],
        create_time: Number((res as any)["Ok"].create_time),
        modify_time: Number((res as any)["Ok"].create_time),
      });
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
          setFileSHA256(res.replace(/^0x/, ""));
        });
      } else {
        setFileSHA256("");
      }
    }
  };

  const contIsReady = () => {
    if (signType === 1) {
      return messageSHA256.length > 0;
    } else {
      return fileSHA256.length > 0;
    }
  };

  return (
    <div className="rounded-xl bg-[#F9FAFB] p-4 flex-1 overflow-auto">
      <div className="border rounded-xl flex border-zinc-200 h-[52px] mb-4 p-4 gap-2 items-center">
        <div className="h-6 w-6 relative">
          {User.profile?.avatar && (
            <img
              src={User.profile?.avatar}
              className="rounded-full bg-zinc-300 h-[22px] top-[1px] left-[1px] w-[22px] absolute"
            />
          )}
        </div>
        <div className="font-medium text-sm text-gray-900">{User.id}</div>
      </div>

      <div className="flex flex-col mb-4 gap-4">
        <div className=" text-sm text-zinc-500  self-stretch">
          What do you want to sign?
        </div>
        <div className="flex w-full items-center">
          {signTypes.map((currentType) => (
            <label
              className="cursor-pointer flex-1 gap-2 label justify-normal"
              key={currentType.type}
            >
              <input
                type="radio"
                name="radio-10"
                className="radio-primary radio"
                checked={signType === currentType.value}
                onChange={() => setType(currentType.value)}
              />
              <span className="label-text">{currentType.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        {signType === 1 && (
          <textarea
            className="w-full textarea-border textarea"
            placeholder="Please enter your message here"
            value={messageCont}
            onChange={(e) => setMessageCont(e.target.value)}
          ></textarea>
        )}
        {signType === 2 && (
          <div className="min-h-40 form-control">
            <label className="cursor-pointer gap-2 label"></label>
            <div className="flex gap-2 items-center">
              <input
                ref={fileSelector}
                type="file"
                className="flex-1 file-input"
                onChange={handleFileChange}
              />
              {fileSHA256 && (
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

      {signType === 1 && (
        <div className="form-control">
          <label className="cursor-pointer gap-2 label justify-start">
            <input
              type="checkbox"
              checked={publicMode}
              onChange={() => setPublicMode(!publicMode)}
              className="checkbox-primary checkbox"
            />
            <span className="text-xs label-text">
              Make your message public.
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
        signatureResult={signatureResult}
        ICPSignResponse={ICPSignResponse}
        selectFile={selectFile}
        publicMode={publicMode}
        onClose={() => {
          setOpenStatus(false);
          setICPSignResult("");
        }}
      />
    </div>
  );
});
