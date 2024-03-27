"use client";
import { ActionModal, TextareaWithCopy, InputWithCopy } from "@/components";
import { useState, useEffect, useMemo } from "react";
import IconSign from "@/assets/svg/icon_sign.svg?react";
import IconCloak from "@/assets/svg/clock.svg?react";
import { SignatureResponse } from "@/types";
import useStore from "@/store";
import dayjs from "dayjs";
import { useCopy } from "@/hooks";
import { siteConfig } from "@/constants";

export default function SignatureResultObject(props: {
  open: boolean;
  signatureResult?: string;
  ICPSignResponse: SignatureResponse | null;
  needShortlink?: boolean;
  selectFile?: File;
  onClose: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [signature, setSignature] = useState<string>("");
  const { User } = useStore();
  const { copy, copyState } = useCopy();

  useEffect(() => {
    console.log("signatureResult", props.signatureResult);
    if (props.open && props.signatureResult) {
      setSignature(props.signatureResult);
    }
    setOpenModal(props.open);
  }, [props]);

  const validLinkUrl = useMemo(() => {
    if (props.ICPSignResponse) {
      return `${siteConfig.url}/sign/verifier/${props.ICPSignResponse.uuid}`;
    }
    return "";
  }, [props.ICPSignResponse]);

  return (
    <ActionModal
      title="Signature Result"
      open={openModal}
      closeByModal
      onClose={props.onClose}
    >
      <div className="flex flex-col gap-4 relative">
        <div className="flex gap-3 items-center">
          <IconSign className="h-[55px] w-[55px] relative" />

          <div className="flex flex-col flex-1 gap-2 items-start">
            {props.selectFile ? (
              <span className="font-medium text-sm text-black  leading-normal tracking-tight">
                "{props.selectFile.name}" has been signed at
              </span>
            ) : (
              <span className="font-medium text-sm text-black  leading-normal tracking-tight">
                The message has been signed at
              </span>
            )}
            <div className="flex font-semibold text-xs leading-none text-neutral-400 gap-1 items-center">
              <IconCloak className="h-4 w-4" />
              {dayjs(props.ICPSignResponse?.create_time).format(
                "DD-MM-YYYY HH:mm:ss"
              )}
            </div>
          </div>
        </div>
        {props.selectFile ? (
          <InputWithCopy value={User.id} label="Valid ID Number:" />
        ) : (
          <>
            <label className="form-control">
              <TextareaWithCopy value={signature} />
            </label>
            <div className="border-t"></div>

            {validLinkUrl && (
              <div className="flex px-20 gap-5 justify-between">
                <div
                  className={
                    "flex flex-col flex-1" + (copyState ? " tooltip" : "")
                  }
                  data-tip={copyState ? "Copied" : ""}
                  onClick={() => {
                    copy(validLinkUrl);
                  }}
                >
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
            )}
          </>
        )}
      </div>
    </ActionModal>
  );
}
