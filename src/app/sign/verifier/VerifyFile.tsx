"use client";
import { ActionModal, TextareaWithCopy } from "@/components";
import { useState, useEffect } from "react";
import { getSigsByHash } from "@/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function VerifyFile(props: {
  open: boolean;
  fileHash: string;
  validId?: number;
  onClose: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [fileSHA256, setFileSHA256] = useState<string | null>(null);

  useEffect(() => {
    setOpenModal(props.open);
    if (props.open) {
      if (props.fileHash) {
        setFileSHA256(props.fileHash);
        const paramsHash = props.fileHash.replace(/^0x/, "");
        getSigsByHash(paramsHash, props.validId).then((res) => {
          console.log("get file sign list,", paramsHash, res);
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
        <div className="flex flex-col gap-4">
          <>
            <label className="form-control">
              <div className="label">
                <span className="label-text">File Hash</span>
              </div>
              <TextareaWithCopy rows={4} value={fileSHA256 || ""} />
            </label>
            <div className="flex gap-3 items-center">list todo</div>

            <div className="border-t"></div>

            {/* <div className="text-xs font-semibold leading-tight ">
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
