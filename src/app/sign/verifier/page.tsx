"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { signTypes } from "@/constants";
import VerifyMessage from "./VerifyMessage";
import VerifyFile from "./VerifyFile";
import { getRecordByUUID, getProfileById, useValid } from "@/hooks";
import { IoIosCloseCircle } from "react-icons/io";
import { sha256OfFile } from "@/utils";
import { useParams } from "react-router-dom";
import { SignatureResponse } from "@/types";
import { signatureResultTemplate } from "@/constants";
import { getString } from "@/api";

export default (function Verifier() {
  const [type, setType] = useState<number>(1);
  const [signatureResult, setSignatureResult] = useState("");
  const [userInputMessage, setUserInputMessage] = useState("");
  const [showUserInputMessage, setShowUserInputMessage] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [fileSHA256, setFileSHA256] = useState("");
  const [selectFile, setSelectFile] = useState<File | undefined>();
  const [ValidID, setValidID] = useState("");
  const [ICPSignResponse, setICPSignResponse] =
    useState<SignatureResponse | null>(null);
  const [switchUserInput, setSwitchUserInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fileSelector = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    if (fileSelector.current) {
      const file = fileSelector.current.files?.[0];
      setSelectFile(file);
      if (file) {
        sha256OfFile(file).then((res) => {
          console.log("get file sha256", res);
          setFileSHA256(res);
        });
      } else {
        setFileSHA256("");
      }
    }
  };

  // get record by uuid
  useEffect(() => {
    if (params.uuid && params.uuid !== ICPSignResponse?.uuid) {
      setLoading(true);
      getRecordByUUID(params.uuid)
        .then(async (res) => {
          console.log("get record by", params.uuid, res);
          const response = res as unknown as SignatureResponse;

          if (response) {
            setICPSignResponse({
              ...response,
              create_time: Number(response.create_time),
              modify_time: Number(response.create_time),
            } as SignatureResponse);

            setType(response.sign_type);

            const profile = await getProfileById(response.created_by);
            console;
            if (profile) {
              if (response.sign_type === 1) {
                // message valid link
                if (response.content_key) {
                  // TODO load content
                  getString(response.content_key).then((res) => {
                    console.log("get string", res);
                    if (res.data?.content) {
                      setSignatureResult(
                        signatureResultTemplate(
                          profile?.public_key,
                          response.hash,
                          response.signature,
                          res.data.content
                        )
                      );
                      setLoading(false);
                      setOpenMessageModal(true);
                    } else {
                      console.warn("get string fail, get:", res);
                      setLoading(false);
                    }
                  });
                } else {
                  setSignatureResult(
                    signatureResultTemplate(
                      profile?.public_key,
                      response.hash,
                      response.signature
                    )
                  );
                  setLoading(false);
                  setShowUserInputMessage(true);
                  setSwitchUserInput(true);
                }
              } else if (response.sign_type === 2) {
                // TODO file valid link
                setLoading(false);
                setOpenMessageModal(true);
              }
            } else {
              console.warn(
                "get profile error by valid id:",
                response.created_by
              );
              setLoading(false);
            }
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params.uuid]);

  const { valid } = useValid();

  useEffect(() => {
    if (signatureResult) {
      const { signatureObject } = valid(signatureResult);

      if (signatureObject) {
        setShowUserInputMessage(!signatureObject.message);
        setSwitchUserInput(!signatureObject.message);
      }
    }
  }, [signatureResult, userInputMessage]);

  const validContIsReady = () => {
    if (type === 1) {
      return showUserInputMessage
        ? userInputMessage.length > 0
        : signatureResult.length > 0;
    } else {
      return fileSHA256.length > 0;
    }
  };

  const handleVerify = () => {
    if (type === 1) {
      setOpenMessageModal(true);
    } else {
      setOpenFileModal(true);
    }
  };

  const finnalMessageSignatureResult = useMemo(() => {
    // TODO
    if (showUserInputMessage && userInputMessage.trim()) {
      return `${userInputMessage.trim()}
${signatureResult.trim()}`;
    } else {
      return signatureResult.trim();
    }
  }, [signatureResult, userInputMessage, showUserInputMessage]);

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
                checked={type === signType.value}
                onChange={() => setType(signType.value)}
              />
              <span className="label-text">{signType.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        {type === 1 && (
          <>
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                checked={!switchUserInput}
                onChange={() => setSwitchUserInput(!switchUserInput)}
                aria-label="Signature"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-2"
              >
                <textarea
                  className="textarea h-60 leading-normal w-full"
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
              </div>

              {showUserInputMessage && (
                <>
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    checked={switchUserInput}
                    onChange={() => setSwitchUserInput(!switchUserInput)}
                    aria-label="Message"
                  />

                  <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-2"
                  >
                    <textarea
                      className="textarea h-60 leading-normal w-full"
                      placeholder={`Please input the message here`}
                      value={userInputMessage}
                      onChange={(e) => setUserInputMessage(e.target.value)}
                    ></textarea>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {type === 2 && (
          <>
            <div className="form-control">
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
                {fileSHA256 && (
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
        disabled={loading || !validContIsReady()}
        onClick={handleVerify}
      >
        Verify
      </button>

      {/* VerifyMessage */}
      <VerifyMessage
        userInputMessage={userInputMessage}
        signatureResult={finnalMessageSignatureResult}
        ICPSignResponse={ICPSignResponse}
        open={openMessageModal}
        onClose={() => {
          setOpenMessageModal(false);
          setUserInputMessage("");
          if (showUserInputMessage) {
            setShowUserInputMessage(false);
            setSwitchUserInput(false);
            setSignatureResult("");
          }
        }}
      />

      {/* VerifyFile */}
      <VerifyFile
        fileHash={fileSHA256}
        validId={ValidID ? Number(ValidID) : undefined}
        open={openFileModal}
        onClose={() => {
          setOpenFileModal(false);
        }}
      />
    </div>
  );
});
