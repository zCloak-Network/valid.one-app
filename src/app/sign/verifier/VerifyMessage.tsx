"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import IconSign from "@/assets/svg/icon_sign.svg?react";
import IconCloak from "@/assets/svg/clock.svg?react";
import UserCard from "./UserCard";
import { useValid, getProfileByPublicKey } from "@/hooks";
import { SignatureResultObject, UserProfile } from "@/types";
import { shortString } from "@/utils";
import { Link } from "react-router-dom";

export default function VerifyMessage(props: {
  open: boolean;
  signatureResult: string;
  onClose: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [signatureObject, setSignatureObject] =
    useState<SignatureResultObject | null>(null);
  const [signerProfile, setSignerProfile] = useState<UserProfile | undefined>();
  const { valid } = useValid();

  useEffect(() => {
    if (signatureObject?.signer) {
      getProfileByPublicKey(signatureObject.signer).then((profile) => {
        profile && setSignerProfile(profile as UserProfile);
      });
    }
  }, [signatureObject]);

  useEffect(() => {
    setOpenModal(props.open);
    if (props.open && props.signatureResult) {
      const { result, signatureObject } = valid(props.signatureResult);
      setIsValid(result);
      setSignatureObject(signatureObject);
      console.log(result);
    } else {
      setIsValid(false);
      setSignatureObject(null);
    }
  }, [props]);
  // const { result, signatureObject } = valid(props.signatureResult);
  const testResult = true;

  return (
    <>
      <ActionModal
        title="Result"
        open={openModal}
        closeByModal
        onClose={props.onClose}
      >
        <div className="flex flex-col gap-4">
          {testResult ? (
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
              <div className="flex items-center gap-3">
                <IconSign className="relative h-[55px] w-[55px]" />

                <div className="flex flex-1 flex-col items-start gap-1">
                  <div className="text-sm">
                    <Link
                      className="link text-neutral-400"
                      to={signerProfile?.id ? `/user/${signerProfile?.id}` : ""}
                    >{`${signerProfile?.id}(${
                      signatureObject?.signer
                        ? shortString(signatureObject.signer)
                        : "Valid User"
                    })`}</Link>
                    has signed this message at
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <IconCloak className="h-4 w-4" />
                    2024-12-12: 00:12:12
                  </div>
                </div>
              </div>

              <div className="border-t"></div>

              {signatureObject?.signer && (
                <UserCard signerProfile={signerProfile} />
              )}

              <div className="h-[21.67px] w-[335px]">
                <span className="text-xs font-semibold leading-tight text-slate-400">
                  Check the on-chain record here:
                </span>

                <a className="text-xs font-semibold leading-tight text-blue-600 underline">
                  {`https://explorer.valid-one.com/${signatureObject?.signature}`}
                </a>
              </div>
            </>
          ) : (
            "Valid Fail"
          )}
        </div>
      </ActionModal>
    </>
  );
}
