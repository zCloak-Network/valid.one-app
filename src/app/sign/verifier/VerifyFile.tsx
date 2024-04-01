"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import { getSigsByHash } from "@/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SignRecord from "./SignRecord";
import type { SignatureResponse } from "@/types";

dayjs.extend(relativeTime);

export default function VerifyFile(props: {
  open: boolean;
  fileHash: string;
  validId?: number;
  onClose: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [fileSHA256, setFileSHA256] = useState<string | null>(null);
  const [list, setList] = useState<SignatureResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpenModal(props.open);
    if (props.open) {
      if (props.fileHash) {
        setFileSHA256(props.fileHash);
        const paramsHash = props.fileHash.replace(/^0x/, "");

        setLoading(true);
        getSigsByHash(paramsHash, props.validId)
          .then((res) => {
            setLoading(false);
            console.log("get file sign list,", paramsHash, res);
            res?.[0] &&
              setList(
                res[0].map((e) => {
                  return {
                    ...e,
                    create_time: Number(e.create_time),
                    modify_time: Number(e.modify_time),
                  };
                })
              );
          })
          .catch(() => {
            setLoading(false);
          });
      }
    } else {
      setFileSHA256(null);
    }
  }, [props]);

  return (
    <>
      <ActionModal
        title="Verify Result"
        open={openModal}
        closeByModal
        onClose={props.onClose}
      >
        <div className="flex flex-col gap-4 relative">
          {loading && (
            <div className="flex h-full w-full top-0 left-0 absolute items-center justify-center">
              <span className="loading loading-ring loading-md"></span>
            </div>
          )}
          <>
            <label className="form-control">
              <div className="label">
                <span className="label-text">File Hash</span>
              </div>
              <TextareaWithCopy rows={4} value={fileSHA256 || ""} />
            </label>
            <div className="flex flex-col gap-4">
              {list.map((record) => {
                return (
                  <SignRecord key={record.uuid} ICPSignResponse={record} />
                );
              })}
            </div>

            <div className="border-t"></div>

            {/* <div className="font-semibold text-xs leading-tight ">
                <span className="text-slate-400 ">
                  Check the on-chain record here
                </span>
                <span className="text-blue-600 ">: </span>
                <a
                  href={`${siteConfig.url}/explorer/${props.fileHash}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {`${siteConfig.url}/explorer/${props.fileHash}`}
                </a>
              </div> */}
          </>
        </div>
      </ActionModal>
    </>
  );
}
