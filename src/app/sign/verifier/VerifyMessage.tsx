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
                      to={signerProfile?.id ? `/user/${signerProfile?.id}` : ""}
                    >{`${signerProfile?.id}(${
                      signatureObject?.signer
                        ? shortString(signatureObject.signer)
                        : "Valid User"
                    })`}</Link>
                    has signed this message at
                  </div>
                  <div className="flex text-xs text-neutral-400 gap-1 items-center">
                    <IconCloak className="h-4 w-4" />
                    2024-12-12: 00:12:12
                  </div>
                </div>
              </div>

              <div className="border-t"></div>

              {signatureObject?.signer && (
                <UserCard signerProfile={signerProfile} />
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
