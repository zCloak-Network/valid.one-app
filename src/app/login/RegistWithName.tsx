import { useState, useMemo } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { useStore } from "@/hooks";
import { useSearchParam } from "react-use";
import { useToast } from "@/components";
import { USERNAME_REG } from "@/constants";

export default (function RegistWithName({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const { User } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registName, setRegistName] = useState("");
  const searchParams = useSearchParam("redirect") || "/id";
  const toast = useToast();

  const handleRegister = async () => {
    if (loading) {
      return null;
    }
    if (!registName) {
      return null;
    }
    setLoading(true);
    try {
      const response = await actor.start_register_name(registName);
      console.log("response", response);
      if ((response as any)["Err"]) {
        throw new Error((response as any)["Err"]);
      }

      const options = JSON.parse((response as any)["Ok"]).publicKey;
      const registrationResult = await startRegistration(options);
      console.log("registrationResult", registrationResult);
      const registReturn = await actor.finish_register_name(
        JSON.stringify(registrationResult)
      );
      console.log("registReturn", registReturn);
      if ((registReturn as any)["Err"]) {
        throw new Error((registReturn as any)["Err"]);
      }
      setLoading(false);
      if ((registReturn as any)["Ok"] === registName) {
        User.login(registName);
        navigate(searchParams);
      } else {
        toast &&
          toast({
            message: "Something went wrong, please try again later. code:0003",
            type: "error",
          });
      }
    } catch (error) {
      setLoading(false);
      console.warn(`startRegistration`, error);
      toast &&
        toast({
          message:
            (error as any)?.message ||
            "Something went wrong, please try again later. code:0001",
          type: "error",
        });
      return;
    }
  };

  const nameIsValid = useMemo(() => {
    return USERNAME_REG.test(registName);
  }, [registName]);

  return (
    <div>
      <label
        className={
          "flex w-full gap-2 input input-bordered items-center" +
          (!registName || nameIsValid ? "" : " input-warning")
        }
      >
        <input
          type="text"
          className="font-semibold text-lg grow"
          placeholder="Input a username"
          value={registName}
          minLength={3}
          maxLength={20}
          onChange={(e) => setRegistName(e.target.value.trim())}
        />
        <span
          className={
            "flex h-8 -mr-4 opacity-70 px-4 items-center justify-center hover:opacity-100" +
            (nameIsValid ? " cursor-pointer" : " cursor-not-allowed")
          }
          onClick={handleRegister}
        >
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            "Regist"
          )}
        </span>
      </label>

      <div className="mt-4 text-sm text-gray-500">
        Regist Valid One with a username.
        <button className="btn btn-link" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
});
