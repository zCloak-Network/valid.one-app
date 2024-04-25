import { default as useStore, observer } from "@/store";
import { PiLightbulbFill } from "react-icons/pi";

import { ChannelHead, useToast } from "@/components";
import { usePasskeyAuth, twitterVerify } from "@/hooks";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { signatureResultTemplate, BIND_SIGN_KEY_PREFIX } from "@/constants";
import { sha256OfString } from "@/utils";
import BindStep1 from "./_step1";
import BindStep2 from "./_step2";
import BindStep3 from "./_step3";

export default observer(function Bind() {
  const toast = useToast();
  const { auth } = usePasskeyAuth();
  const { User } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const steps = [
    {
      title: "Sign message",
    },
    {
      title: "Post-twitter(X)",
    },
    {
      title: "To-be-verified",
    },
  ];
  const title = useMemo(() => {
    return steps[step].title;
  }, [step]);

  const messageContTrim = User.id
    ? `I hereby declare ${User.id} is my Valid ID.`
    : "";

  const signCont = useMemo(() => {
    return sha256OfString(messageContTrim);
  }, [User.profile?.public_key]);

  const signType = 1;
  const [ICPSignResult, setICPSignResult] = useState("");
  const signStoreKey = `${BIND_SIGN_KEY_PREFIX}_${User.id}`;
  console.log("autorun", signStoreKey);
  const localSignString = localStorage.getItem(signStoreKey);
  if (localSignString && localSignString !== ICPSignResult) {
    console.log("autorun22", localSignString);
    setICPSignResult(localSignString);
    setStep(1);
  }

  const [loading, setLoading] = useState(false);

  const signatureResult = useMemo(() => {
    if (User.profile && signCont && ICPSignResult) {
      return signatureResultTemplate(
        User.profile.public_key,
        signCont,
        ICPSignResult,
        messageContTrim
      );
    }
    return undefined;
  }, [ICPSignResult, signCont]);

  const handleSign = async () => {
    if (!User.profile?.public_key) {
      toast &&
        toast({
          type: "error",
          message: "Please complete your profile first",
        });
      return navigate("/id/profile/edit");
    }
    setLoading(true);

    let publicContentKey = "";

    const authRequest = await auth().catch(() => {
      setLoading(false);
    });

    let res;
    if (authRequest) {
      res = await actor
        .sign_insert(authRequest, signType, signCont, publicContentKey)
        .catch(() => {
          toast &&
            toast({
              type: "error",
              message: "Sign failed",
            });
          setLoading(false);
        });
      console.log(User.id, signType, signCont, "sign result", res);
    }

    if ((res as any)["Ok"]?.signature) {
      setICPSignResult((res as any)["Ok"].signature);
      localStorage.setItem(signStoreKey, (res as any)["Ok"].signature);
      setStep(1);
    } else {
      console.warn("sign fail", res);
    }

    setLoading(false);
  };

  const [tweetUrl, setTweetUrl] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const handleVerify = async () => {
    setLoadingVerify(true);
    const response = await twitterVerify(tweetUrl).catch((e: Error) => {
      console.warn(e);
    });

    console.log("response", response);
    if (!(response as any)?.["Ok"]) {
      setLoadingVerify(false);

      setVerifyError(true);
    } else {
      await User.getProfile().catch((e: Error) => {
        toast &&
          toast({
            type: "error",
            message: e.message || "Update profile error",
          });
      });
      setLoadingVerify(false);
      navigate("/id");
      localStorage.removeItem(signStoreKey);
    }
  };

  return (
    <div className="bg-white flex flex-col h-full w-full p-6">
      <ChannelHead path="/id" title={title} />

      <div className="flex-1 my-4 overflow-auto">
        {step === 0 && <BindStep1 cont={messageContTrim} />}
        {step === 1 && signatureResult && <BindStep2 cont={signatureResult} />}
        {step === 2 && signatureResult && (
          <BindStep3
            onChange={(str) => {
              setTweetUrl(str);
              setVerifyError(false);
            }}
          />
        )}
      </div>

      {verifyError && (
        <div className="my-4 p-4 bg-red-600 bg-opacity-10 rounded-2xl justify-start items-center gap-4 inline-flex">
          <div className="w-10 h-10 p-2 bg-white rounded-lg justify-center items-center flex">
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <PiLightbulbFill className="w-6 h-6 text-[#FF6B2E]" />
            </div>
          </div>
          <div className="grow shrink basis-0 text-gray-900 text-xs font-normal font-['Manrope'] leading-[18px]">
            Verification failed. Please ensure your signed result is posted on X
            (Twitter) and the link is correct.
          </div>
        </div>
      )}

      {step === 0 && (
        <button className="mb-4 btn btn-block btn-neutral" onClick={handleSign}>
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            "Sign"
          )}
        </button>
      )}
      {step === 1 && (
        <button
          className="mb-4 btn btn-block btn-neutral"
          onClick={() => setStep(2)}
        >
          Next Step
        </button>
      )}
      {step === 2 && (
        <button
          className={`mb-4 btn btn-block btn-neutral${
            verifyError ? " border-warning" : ""
          }`}
          disabled={!tweetUrl}
          onClick={handleVerify}
        >
          {loadingVerify ? (
            <span className="loading loading-spinner "></span>
          ) : (
            "Verify"
          )}
        </button>
      )}
    </div>
  );
});
