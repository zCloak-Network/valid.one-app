import { default as useStore, observer } from "@/store";

import { ChannelHead, useToast } from "@/components";
import { usePasskeyAuth, twitterVerify } from "@/hooks";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { signatureResultTemplate } from "@/constants";
import { sha256OfString } from "@/utils";
import BindStep1 from "./_step1";
import BindStep2 from "./_step2";

export default observer(function Bind() {
  const toast = useToast();
  const { auth } = usePasskeyAuth();
  const { User } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Sign message",
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

    const [authRequest] = await auth();
    let res;
    try {
      res = await actor.sign_insert(
        authRequest,
        signType,
        signCont,
        publicContentKey
      );
      console.log(User.id, signType, signCont, "sign result", res);
    } catch (err) {
      console.log(err);
    }

    if ((res as any)["Ok"]?.signature) {
      setICPSignResult((res as any)["Ok"].signature);

      setStep(1);
    } else {
      console.warn("sign fail", res);
    }

    setLoading(false);
  };

  const [tweetUrl, setTweetUrl] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const handleVerify = async () => {
    setLoadingVerify(true);
    const result = await twitterVerify(tweetUrl).catch((e: Error) => {
      console.warn(e);
      toast &&
        toast({
          type: "error",
          message: e.message || "Verify error",
        });
    });
    setLoadingVerify(false);
    console.log("result", result);
  };

  return (
    <div className="bg-white flex flex-col h-full w-full p-6">
      <ChannelHead path="/id" title={title} />

      <div className="flex-1 my-4 overflow-auto">
        {step === 0 && <BindStep1 cont={messageContTrim} />}
        {step === 1 && signatureResult && (
          <BindStep2 cont={signatureResult} onChange={setTweetUrl} />
        )}
      </div>

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