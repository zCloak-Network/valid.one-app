import Logo from "@/assets/svg/logo_explorer.svg?react";
import Row, { SkeletonRows } from "./Row";
import Pagination from "@mui/material/Pagination";
import { Link, useParams } from "react-router-dom";
import { useGetSigs, useQuerySigs } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { ResponseDrawer } from "@/components";
import { Sign } from "@/utils/canister/valid_one_backend/valid_one_backend.did";
import { CgLoadbarDoc } from "react-icons/cg";

export const PageSize = 10;
export const DefaultPage = 1;

export default function Explorer() {
  const [page, setPage] = useState<number>(DefaultPage);
  const { data, loading } = useGetSigs(page, PageSize);
  const pagesize = useMemo(() => {
    return data?.size ? Math.ceil(data.size / PageSize) : DefaultPage;
  }, [data]);

  const { uuid } = useParams<{ uuid: string }>();
  const [sigOrUUID, setSigOrUUID] = useState<string | undefined>(uuid);

  useEffect(() => {
    setSigOrUUID(uuid);
  }, [uuid]);

  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(sigOrUUID || "");
    },
    500,
    [sigOrUUID]
  );

  const { loading: queryLoading, data: queryData } =
    useQuerySigs(debouncedValue);

  const [publicCont, setPublicCont] = useState("");
  const [currentRow, setCurrentRow] = useState<Sign | null>(null);

  return (
    <div className="flex flex-col h-100vh">
      <div className="bg-white border-b flex border-zinc-100 h-20 w-full px-4 items-center sm:px-10">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col flex-1 w-full px-4 pt-8 overflow-hidden sm:px-20">
        <div className="flex flex-col mb-4 justify-between sm:flex-row sm:mb-0 sm:items-center">
          <div>
            <Link
              to="/explorer"
              className="font-extrabold text-neutral-900 text-3xl leading-10"
            >
              Valid Explorer
            </Link>
            <div className="font-normal mt-3 text-sm leading-tight py-4 text-gray-500 sm:py-8">
              Explore recent signatures posted from Valid Sign
            </div>
          </div>
          <div className="sm:w-[40%]">
            <label className="flex gap-2 input input-bordered items-center focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 opacity-70 w-4"
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
        <div className="flex-1 overflow-auto">
          <table className="min-w-[700px] table table-pin-rows table-pin-cols">
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
                        <Row
                          data={queryData}
                          handlePublicMsg={(msg) => {
                            setPublicCont(msg);
                            setCurrentRow(queryData);
                          }}
                        />
                      ) : (
                        <div className="py-6 text-gray-400">No Data.</div>
                      )}
                    </>
                  ) : (
                    <>
                      {data?.result.map((item) => (
                        <Row
                          key={item.uuid}
                          data={item}
                          handlePublicMsg={(msg) => {
                            setPublicCont(msg);
                            setCurrentRow(item);
                          }}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {!uuid && (
          <div className="flex py-8 gap-5 items-center">
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

      <ResponseDrawer
        closeByModal
        open={!!publicCont}
        onClose={() => {
          setPublicCont("");
          setCurrentRow(null);
        }}
        title="Sgin Message"
      >
        <div className="sm:p-8 sm:w-[480px]">
          {currentRow && (
            <table className="w-full table overflow-visible">
              <thead>
                <tr>
                  <td>Time</td>
                  <td>Signer</td>
                  <td>Signature</td>
                </tr>
              </thead>
              <tbody>
                <Row simple data={currentRow} />
              </tbody>
            </table>
          )}
          <div className="flex font-semibold py-4 gap-2 items-center sm:mt-10">
            <CgLoadbarDoc className="h-6 w-6" />
            Message Content
          </div>
          <div className="pl-8 text-gray-500">{publicCont}</div>
        </div>
      </ResponseDrawer>
    </div>
  );
}
