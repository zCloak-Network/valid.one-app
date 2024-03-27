import { Sign, SignResult } from "@/utils/canister/idl/valid_one_backend.did";
import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { getAllSigs, getRecordBySignature, getRecordByUUID } from ".";

export function useGetSigs(page: number, size: number) {
  const [loading, toggle] = useToggle(false);
  const [data, setData] = useState<SignResult>();

  useEffect(() => {
    toggle();
    getAllSigs(page, size).then(setData).then(toggle);
  }, [toggle, page, size]);

  return { data, loading };
}

function isUUID(uuid: string) {
  return uuid.length === 20;
}

export function useQuerySigs(sigOrUUID: string) {
  const [loading, toggle] = useToggle(false);
  const [data, setData] = useState<Sign | null>(null);

  useEffect(() => {
    if (sigOrUUID === "") return;
    toggle();
    isUUID(sigOrUUID)
      ? getRecordByUUID(sigOrUUID).then(setData).then(toggle)
      : getRecordBySignature(sigOrUUID).then(setData).then(toggle);
  }, [toggle, sigOrUUID]);
  return { data, loading };
}
