import { ResponseLayout } from "@/app/layout";
import { ChannelHead, useToast } from "@/components";
import Logo from "@/assets/images/logo.png";
import { useState, useMemo } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { useStore } from "@/hooks";
import { useSearchParam } from "react-use";
import { USERNAME_REG } from "@/constants";

export default (function Register() {
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
    <ResponseLayout>
      <div className="bg-white h-full mx-auto w-full relative px-4 flex flex-col">
        <ChannelHead path="/login" title="Register" />

        <div className="flex-1 overflow-auto">
          <img src={Logo} alt="logo" className="w-[58px] mx-auto my-10" />
          <div className="text-center mb-16">
            <div className=" text-slate-900 text-[28px] font-bold mb-2">
              Create account
            </div>
            <div className=" text-slate-500 text-sm tracking-tight">
              Please enter your username.
            </div>
          </div>

          <label className={"form-control w-full mb-10"}>
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              className={
                "font-semibold text-lg input input-bordered" +
                (!registName || nameIsValid ? "" : " input-warning")
              }
              placeholder="Your username"
              value={registName}
              minLength={3}
              maxLength={20}
              onChange={(e) => setRegistName(e.target.value.trim())}
            />
          </label>
          <button
            className="btn btn-block btn-neutral mb-4"
            disabled={!nameIsValid}
            onClick={handleRegister}
          >
            {loading ? (
              <span className="loading loading-spinner "></span>
            ) : (
              "Regist"
            )}
          </button>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Register Valid One with a username.
          </div>
        </div>
      </div>
    </ResponseLayout>
  );
});
