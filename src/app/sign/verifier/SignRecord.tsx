"use client";
import IconSign from "@/assets/svg/icon_sign.svg?react";
import IconCloak from "@/assets/svg/clock.svg?react";
import { SignatureResultObject } from "@/types";
import { shortString } from "@/utils";
import { Link } from "react-router-dom";
import type { SignatureResponse } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function SignRecord(props: {
  signatureObject?: SignatureResultObject | null;
  ICPSignResponse: SignatureResponse | null;
}) {
  return (
    <div className="flex gap-3 items-center">
      <IconSign className="h-[55px] w-[55px] relative" />

      <div className="flex flex-col flex-1 gap-1 items-start">
        <div className="text-sm leading-tight">
          <Link
            className={`link${
              props.ICPSignResponse?.created_by
                ? " text-neutral-400"
                : " link-hover"
            }`}
            to={
              props.ICPSignResponse?.created_by
                ? `/id/${props.ICPSignResponse.created_by}`
                : ""
            }
          >{`${
            props.ICPSignResponse?.created_by
              ? "Valid ID " + props.ICPSignResponse?.created_by
              : ""
          } ${
            props.signatureObject?.signer
              ? "(" + shortString(props.signatureObject.signer) + ") "
              : " "
          }`}</Link>
          has signed this message at
        </div>
        <div className="flex text-xs text-neutral-400 gap-1 items-center">
          <IconCloak className="h-4 w-4" />
          {`${dayjs(props.ICPSignResponse?.create_time).format(
            "DD-MM-YYYY HH:mm:ss"
          )} (${dayjs().from(dayjs(props.ICPSignResponse?.create_time))})`}
        </div>
      </div>
    </div>
  );
}
