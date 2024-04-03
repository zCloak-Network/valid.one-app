"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useValid, getRecordBySignature } from "@/hooks";
import { SignatureResultObject } from "@/types";
import type { SignatureResponse } from "@/types";
import { siteConfig } from "@/constants";
import SignRecord from "./SignRecord";

export default function VerifyMessage(props: {
  open: boolean;
  signatureResult: string;
  ICPSignResponse: SignatureResponse | null;
  userInputMessage?: string;
  onClose: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [signatureObject, setSignatureObject] =
    useState<SignatureResultObject | null>(null);
  const { valid } = useValid();
  const [ICPSignResponse, setICPSignResponse] =
    useState<SignatureResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [orignalMessage, setOrignalMessage] = useState("");

  useEffect(() => {
    setOpenModal(props.open);
    if (props.open) {
      if (props.signatureResult) {
        const { result, signatureObject } = valid(props.signatureResult);
        setIsValid(result);
        setSignatureObject(signatureObject);
        console.log(result);

        if (props.userInputMessage) {
          setOrignalMessage(props.userInputMessage);
        }

        if (props.ICPSignResponse) {
          setICPSignResponse(props.ICPSignResponse);
        } else if (signatureObject?.signature) {
          setLoading(true);
          getRecordBySignature(signatureObject.signature.replace(/^0x/, ""))
            .then((response) => {
              console.log(
                signatureObject.signature.replace(/^0x/, ""),
                "===>",
                response
              );
              if (response) {
                setICPSignResponse({
                  ...response,
                  create_time: Number(response.create_time),
                  modify_time: Number(response.create_time),
                } as SignatureResponse);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    } else {
      setIsValid(false);
      setSignatureObject(null);
    }
  }, [props]);

  return (
    <>
      <ActionModal
        title="Verification Resut"
        open={openModal}
        closeByModal
        onClose={props.onClose}
      >
        <div className="flex flex-col gap-4 relative">
          {loading && (
            <div className="absolute left-0 w-full top-0 h-full flex items-center justify-center">
              <span className="loading loading-ring loading-md"></span>
            </div>
          )}
          {isValid ? (
            <>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Message</span>
                </div>
                <TextareaWithCopy
                  rows={4}
                  value={signatureObject?.message || ""}
                />
              </label>
              <SignRecord
                signatureObject={signatureObject}
                ICPSignResponse={ICPSignResponse}
              />

              <div className="border-t"></div>

              {ICPSignResponse?.created_by && (
                <UserCard validId={ICPSignResponse.created_by} />
              )}

              {ICPSignResponse?.uuid && (
                <div className="text-xs font-semibold leading-tight ">
                  <span className="text-slate-400 ">
                    Check the on-chain record here
                  </span>
                  <span className="text-blue-600 ">: </span>
                  <a
                    href={`${siteConfig.url}/#/explorer/${ICPSignResponse.uuid}`}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {`${siteConfig.url}/#/explorer/${ICPSignResponse.uuid}`}
                  </a>
                </div>
              )}
            </>
          ) : (
            "Valid Fail"
          )}
        </div>
      </ActionModal>
    </>
  );
}
