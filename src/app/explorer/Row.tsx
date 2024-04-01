import { Sign } from "@/utils/canister/idl/valid_one_backend.did";
import moment from "moment";
import { ShortAddress } from "@/components";

export default function Row({ data }: { data: Sign }) {
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
      <td>{data.sign_type === 1 ? "Message" : "File"}</td>
      <td>
        <ShortAddress
          value={data.hash}
          showTip
          className="break-words"
          clickCopy
        />
      </td>
      <td>
        {data.content_key ? (
          <a className="link link-info">Public</a>
        ) : (
          "Private"
        )}
      </td>
    </tr>
  );
}

export function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <tr className="skeleton h-10" key={index}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <td key={idx + index} />
          ))}
        </tr>
      ))}
    </>
  );
}
