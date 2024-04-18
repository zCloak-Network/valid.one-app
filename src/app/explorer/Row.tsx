import { Sign } from "@/utils/canister/valid_one_backend/valid_one_backend.did";
import moment from "moment";
import { ShortAddress } from "@/components";
import { getString } from "@/api";
import { useState } from "react";

export default function Row({
  data,
  handlePublicMsg,
  simple,
}: {
  data: Sign;
  handlePublicMsg?: (msg: string) => void;
  simple?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  // const [pubStr, setPubStr] = useState("");

  const handleGetPubMsg = (key: string) => {
    setLoading(true);
    getString(key)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res?.data?.content) {
          handlePublicMsg?.(res.data.content);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <tr>
      <td>{moment(Number(data.create_time)).format("YYYY-MM-DD HH:mm:ss")}</td>
      <td>{data.created_by}</td>
      <td>
        <ShortAddress
          value={data.signature}
          showTip
          className="break-words"
          clickCopy
        />
      </td>
      {!simple && <td>{data.sign_type === 1 ? "Message" : "File"}</td>}
      {!simple && (
        <td>
          <ShortAddress
            value={data.hash}
            showTip
            className="break-words"
            clickCopy
          />
        </td>
      )}
      {!simple && (
        <td>
          {data.content_key ? (
            <a
              className="link link-info"
              onClick={() => handleGetPubMsg(data.content_key)}
            >
              {loading ? (
                <button className="btn btn-square btn-xs">
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                "Public"
              )}
            </a>
          ) : (
            "Private"
          )}
        </td>
      )}
    </tr>
  );
}

export function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <tr className="h-10 skeleton" key={index}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <td key={idx + index} />
          ))}
        </tr>
      ))}
    </>
  );
}
