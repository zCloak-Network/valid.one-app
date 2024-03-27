import { Sign } from "@/utils/canister/idl/valid_one_backend.did";
import moment from "moment";
import { useCopyToClipboard } from "react-use";
export default function Row({ data }: { data: Sign }) {
  const [_, copy] = useCopyToClipboard();

  return (
    <tr>
      <td>{moment(Number(data.create_time)).format("YYYY-MM-DD HH:mm:ss")}</td>
      <td>{data.created_by}</td>
      <td>
        <div className="tooltip break-words" data-tip={data.signature}>
          <span className="w-80 truncate block cursor-pointer" onClick={() => copy(data.signature)}>
            {data.signature}
          </span>
        </div>
      </td>
      <td>{data.content}</td>
      <td>{data.sign_type}</td>
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
