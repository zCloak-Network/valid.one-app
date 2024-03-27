"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import IconSign from "@/assets/svg/icon_sign.svg?react";
import IconCloak from "@/assets/svg/clock.svg?react";
import UserCard from "./UserCard";
import { useValid, getRecordBySignature } from "@/hooks";
import { SignatureResultObject } from "@/types";
import { shortString } from "@/utils";
import { Link } from "react-router-dom";
import type { SignatureResponse } from "@/types";
import dayjs from "dayjs";
import { siteConfig } from "@/constants";

export default function VerifyMessage(props: {
  open: boolean;
  signatureResult: string;
  ICPSignResponse: SignatureResponse | null;
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

  useEffect(() => {
    setOpenModal(props.open);
    if (props.open) {
      if (props.signatureResult) {
        const { result, signatureObject } = valid(props.signatureResult);
        setIsValid(result);
        setSignatureObject(signatureObject);
        console.log(result);

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
        title="Result"
        open={openModal}
        closeByModal
        onClose={props.onClose}
      >
        <div className="flex flex-col gap-4">
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
              <div className="flex gap-3 items-center">
                <IconSign className="h-[55px] w-[55px] relative" />

                <div className="flex flex-col flex-1 gap-1 items-start">
                  <div className="text-sm">
                    <Link
                      className="text-neutral-400 link"
                      to={
                        ICPSignResponse?.created_by
                          ? `/user/${ICPSignResponse.created_by}`
                          : ""
                      }
                    >{`${ICPSignResponse?.created_by || ""}(${
                      signatureObject?.signer
                        ? shortString(signatureObject.signer)
                        : "Valid User"
                    })`}</Link>
                    has signed this message at
                  </div>
                  <div className="flex text-xs text-neutral-400 gap-1 items-center">
                    <IconCloak className="h-4 w-4" />
                    {dayjs(ICPSignResponse?.create_time).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                  </div>
                </div>
              </div>

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
                    href={`${siteConfig.url}/explorer/${ICPSignResponse.uuid}`}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {`${siteConfig.url}/explorer/${ICPSignResponse.uuid}`}
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
