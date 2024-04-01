import Logo from "@/assets/svg/logo_explorer.svg?react";
import Row, { SkeletonRows } from "./Row";
import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import { useGetSigs, useQuerySigs } from "@/hooks";
import { useMemo, useState } from "react";
import { useDebounce } from "react-use";

export const PageSize = 10;
export const DefaultPage = 1;

export default function Explorer() {
  const [page, setPage] = useState<number>(DefaultPage);
  const { data, loading } = useGetSigs(page, PageSize);
  const pagesize = useMemo(
    () => (data?.size ? Math.ceil(data.size / PageSize) : DefaultPage),
    [data]
  );

  const { uuid } = useParams<{ uuid: string }>();
  const [sigOrUUID, setSigOrUUID] = useState<string>(uuid ?? "");

  const [debouncedValue, setDebouncedValue] = useState("");

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(sigOrUUID);
    },
    500,
    [sigOrUUID]
  );

  const { loading: queryLoading, data: queryData } =
    useQuerySigs(debouncedValue);

  return (
    <div>
      <div className="w-full h-20 bg-white border-b border-zinc-100 flex items-center px-10">
        <Logo />
      </div>
      <div className="w-full px-20 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-neutral-900 text-3xl font-extrabold leading-10">
              Valid Explorer
            </div>
            <div className="text-gray-500 text-sm font-normal mt-3 leading-tight py-8">
              Explore recent signatures posted from Valid Sign
            </div>
          </div>
          <div className="w-[40%]">
            <label className="input input-bordered flex focus:outline-none items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={(e) => setSigOrUUID(e.target.value)}
                value={sigOrUUID}
                type="text"
                className="grow focus:outline-none"
                placeholder="Search by signature, or hash value of the signed object"
              />
              {queryLoading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-pin-rows table-pin-cols">
            <thead>
              <tr className="bg-neutral-50">
                <td>Time</td>
                <td>Signer</td>
                <td>Signature</td>
                <td>Object Type</td>
                <td>Object Hash</td>
                <td>Sign Mode</td>
              </tr>
            </thead>
            <tbody>
              {loading || queryLoading ? (
                <SkeletonRows />
              ) : (
                <>
                  {uuid || debouncedValue ? (
                    <>
                      {queryData ? (
                        <Row data={queryData} />
                      ) : (
                        <div className="py-6 text-gray-400">No Data.</div>
                      )}
                    </>
                  ) : (
                    <>
                      {data?.result.map((item) => (
                        <Row key={item.uuid} data={item} />
                      ))}
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {!uuid && (
          <div className="flex items-center gap-5 py-8">
            {/* <div className="text-sm text-gray-500">
              Showing {data?.result.length} of {data?.size}
            </div> */}
            <Pagination
              page={page}
              onChange={(e, page) => setPage(page)}
              count={pagesize}
              variant="outlined"
              shape="rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
